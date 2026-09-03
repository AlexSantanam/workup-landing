/**
 * Utilidades monetarias para Chile (UF y CLP) y cálculos de Renting Operativo OpEx
 */

// Valor referencial UF 2026 en Chile (fallback si la API en vivo no responde)
export let CURRENT_UF_VALUE_CLP = 38540;
export const CHILEAN_IVA_RATE = 0.19; // 19% IVA en Chile
export const CORPORATE_TAX_RATE = 0.27; // 27% Impuesto de Primera Categoría (Régimen General Art. 14 A LIR)

/**
 * Obtiene el valor UF del día vigente desde mindicador.cl (API pública del
 * Banco Central de Chile, sin key, con CORS habilitado) y actualiza el
 * valor de referencia usado por toda la app. Si falla, se mantiene el
 * valor de respaldo y no se lanza excepción.
 */
export async function fetchLiveUF(): Promise<{ value: number; date: string } | null> {
  try {
    const res = await fetch('https://mindicador.cl/api/uf');
    if (!res.ok) return null;
    const data = await res.json();
    const valor = data?.serie?.[0]?.valor;
    const fecha = data?.serie?.[0]?.fecha;
    if (typeof valor !== 'number' || !(valor > 0)) return null;

    CURRENT_UF_VALUE_CLP = Math.round(valor);
    return { value: CURRENT_UF_VALUE_CLP, date: fecha ?? new Date().toISOString() };
  } catch {
    return null;
  }
}

export function ufToClp(ufValue: number): number {
  return Math.round(ufValue * CURRENT_UF_VALUE_CLP);
}

export function clpToUf(clpValue: number): number {
  return Number((clpValue / CURRENT_UF_VALUE_CLP).toFixed(2));
}

export function formatUF(value: number, includeDecimals = true): string {
  const formatted = value.toLocaleString('es-CL', {
    minimumFractionDigits: includeDecimals ? 2 : 0,
    maximumFractionDigits: includeDecimals ? 2 : 0,
  });
  return `${formatted} UF`;
}

export function formatCLP(value: number): string {
  const formatted = Math.round(value).toLocaleString('es-CL');
  return `$${formatted} CLP`;
}

export function formatCurrency(
  valueUF: number,
  currency: 'UF' | 'CLP',
  includeIVA = false
): string {
  const baseValue = currency === 'UF' ? valueUF : ufToClp(valueUF);
  const finalValue = includeIVA ? baseValue * (1 + CHILEAN_IVA_RATE) : baseValue;

  if (currency === 'UF') {
    return `${formatUF(finalValue)} ${includeIVA ? 'IVA inc.' : '+ IVA'}`;
  } else {
    return `${formatCLP(finalValue)} ${includeIVA ? 'IVA inc.' : '+ IVA'}`;
  }
}

/**
 * Calcula el ahorro tributario y financiero del Renting Operativo (OpEx 100% deducible)
 * frente a la compra directa / leasing financiero (CapEx).
 */
export function calculateOpexAdvantage(params: {
  vehicleCount: number;
  averageVehiclePriceCLP: number;
  months: number;
  monthlyUFPerVehicle: number;
}) {
  const { vehicleCount, averageVehiclePriceCLP, months, monthlyUFPerVehicle } = params;

  // 1. ESCENARIO COMPRA DIRECTA / CAPEX
  const totalPurchaseCapex = vehicleCount * averageVehiclePriceCLP;
  
  // Costos operacionales asumidos por la empresa dueña durante el periodo:
  // Mantenimiento preventivo y correctivo en faena (~$350.000/mes/vehículo)
  const maintenanceCostTotal = vehicleCount * 350000 * months;
  // Seguro minero todo riesgo + deducible faena (~$140.000/mes/vehículo)
  const insuranceCostTotal = vehicleCount * 140000 * months;
  // Costo equipamiento minero certificado SERNAGEOMIN ($4.200.000 por camioneta)
  const miningEquipTotal = vehicleCount * 4200000;
  // Pérdida por depreciación acelerada en faena severa (40% de desvalorización en 2-3 años)
  const depreciationLoss = totalPurchaseCapex * 0.42;
  // Costo administrativo y gestión de flota / reemplazos (~$80.000/mes/vehículo)
  const fleetAdminCost = vehicleCount * 80000 * months;

  const totalCapexOutlay = totalPurchaseCapex + maintenanceCostTotal + insuranceCostTotal + miningEquipTotal + fleetAdminCost;
  // Valor residual de reventa en mercado secundario tras faena
  const resaleValueEstimate = totalPurchaseCapex - depreciationLoss;
  const netCapexCost = totalCapexOutlay - resaleValueEstimate;

  // 2. ESCENARIO RENTING OPERATIVO WORKUP (OPEX)
  const monthlyRentingCLP = ufToClp(monthlyUFPerVehicle) * vehicleCount;
  const totalRentingOutlay = monthlyRentingCLP * months;
  
  // Escudo Tributario (Tax Shield): El 100% de la cuota de Renting es Gasto Aceptado (Art. 31 Ley de Impuesto a la Renta)
  // Rebaja directa de la base imponible al 27% de Primera Categoría
  const taxShieldRenting = totalRentingOutlay * CORPORATE_TAX_RATE;
  const netRentingCost = totalRentingOutlay - taxShieldRenting;

  // Beneficio neto y ahorro de capital de trabajo
  const netSavings = netCapexCost - netRentingCost;
  const freedCapital = totalPurchaseCapex; // Capital no inmovilizado en activos fijos

  return {
    totalPurchaseCapex,
    totalCapexOutlay,
    netCapexCost,
    totalRentingOutlay,
    taxShieldRenting,
    netRentingCost,
    netSavings: Math.max(0, netSavings),
    freedCapital,
    monthlyRentingCLP,
  };
}
