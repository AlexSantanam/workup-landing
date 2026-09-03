import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Building2, 
  PieChart, 
  Sparkles,
  Info,
  Truck,
  Anchor,
  ThermometerSnowflake,
  Package
} from 'lucide-react';
import { calculateOpexAdvantage, formatCLP, formatUF, CURRENT_UF_VALUE_CLP } from '../utils/currency';

interface OpexCalculatorProps {
  currency: 'UF' | 'CLP';
  onGoToQuote: () => void;
}

export const OpexCalculator: React.FC<OpexCalculatorProps> = ({
  currency,
  onGoToQuote,
}) => {
  const [vehicleCount, setVehicleCount] = useState<number>(4);
  const [contractMonths, setContractMonths] = useState<number>(36);
  const [vehicleType, setVehicleType] = useState<'van' | 'cold_van' | 'heavy_truck' | 'crane_truck' | 'pickup'>('van');

  // Pricing constants based on vehicle type
  const vehicleConfig = useMemo(() => {
    switch (vehicleType) {
      case 'van':
        return { name: 'Furgón Logístico / Courier 13 m³ (Peugeot Boxer / MB Sprinter)', priceCLP: 36900000, monthlyUF: 32.0 };
      case 'cold_van':
        return { name: 'Furgón Refrigerado / Cadena de Frío (Hyundai H350 Thermo King)', priceCLP: 42500000, monthlyUF: 39.5 };
      case 'heavy_truck':
        return { name: 'Camión de Flete Gran Volumen 15T (Mercedes Actros / Volvo FM)', priceCLP: 84000000, monthlyUF: 89.0 };
      case 'crane_truck':
        return { name: 'Camión Pluma Articulada Hiab 14 Ton/m (Scania / Freightliner)', priceCLP: 98000000, monthlyUF: 105.0 };
      case 'pickup':
        return { name: 'Camioneta 4x4 Corporativa / Faena (Toyota Hilux / L200)', priceCLP: 32500000, monthlyUF: 28.5 };
    }
  }, [vehicleType]);

  const analysis = useMemo(() => {
    return calculateOpexAdvantage({
      vehicleCount,
      averageVehiclePriceCLP: vehicleConfig.priceCLP,
      months: contractMonths,
      monthlyUFPerVehicle: vehicleConfig.monthlyUF,
    });
  }, [vehicleCount, contractMonths, vehicleConfig]);

  return (
    <section id="calculadora-opex" className="py-16 lg:py-24 bg-slate-950 text-white relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-4 h-4" />
            <span>Escudo Tributario & Optimización Financiera B2B</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white">
            Calculadora Financiera: Renting (OpEx) vs. Compra / Leasing (CapEx)
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Compara el impacto financiero para tu empresa de distribución, panadería, logística, fletes o faena. Aprovecha el <strong className="text-slate-200">100% de gasto deducible (Art. 31 LIR - SII)</strong> sin inmovilizar capital ni endeudarte.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form (Left Column) */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl space-y-6">
            <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <span>Configuración de Flota Comercial</span>
            </h3>

            {/* 1. Vehicle Type Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                1. Tipo de Unidad / Operación
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setVehicleType('van')}
                  className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                    vehicleType === 'van'
                      ? 'bg-amber-500/10 border-amber-500 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-amber-400" />
                    <span>Furgón Paquetería</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-normal">Courier / Última Milla</div>
                </button>

                <button
                  type="button"
                  onClick={() => setVehicleType('cold_van')}
                  className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                    vehicleType === 'cold_van'
                      ? 'bg-amber-500/10 border-amber-500 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <ThermometerSnowflake className="w-3.5 h-3.5 text-sky-400" />
                    <span>Furgón Frío / Alimentos</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-normal">Panaderías & Carnes</div>
                </button>

                <button
                  type="button"
                  onClick={() => setVehicleType('heavy_truck')}
                  className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                    vehicleType === 'heavy_truck'
                      ? 'bg-amber-500/10 border-amber-500 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Camión Gran Volumen</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-normal">Fletes Interurbanos 15T</div>
                </button>

                <button
                  type="button"
                  onClick={() => setVehicleType('crane_truck')}
                  className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                    vehicleType === 'crane_truck'
                      ? 'bg-amber-500/10 border-amber-500 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Anchor className="w-3.5 h-3.5 text-amber-400" />
                    <span>Camión con Grúa Pluma</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-normal">Montaje & Izaje 14 Tn/m</div>
                </button>

                <button
                  type="button"
                  onClick={() => setVehicleType('pickup')}
                  className={`p-3 rounded-xl border text-left text-xs font-bold transition-all sm:col-span-2 ${
                    vehicleType === 'pickup'
                      ? 'bg-amber-500/10 border-amber-500 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Camioneta 4x4 Corporativa / Terreno</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-normal">Supervisión, Obras y Servicios de Campo</div>
                </button>
              </div>
            </div>

            {/* 2. Number of Vehicles Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-300">
                <span className="uppercase tracking-wider">2. Cantidad de Vehículos en Flota</span>
                <span className="text-base font-mono text-amber-400 font-extrabold">{vehicleCount} Unidades</span>
              </div>
              <input
                type="range"
                min={1}
                max={50}
                value={vehicleCount}
                onChange={(e) => setVehicleCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>1 unidad</span>
                <span>25 unidades</span>
                <span>50 unidades</span>
              </div>
            </div>

            {/* 3. Contract Term Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                3. Plazo de Operación del Contrato
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[12, 24, 36, 48].map((months) => (
                  <button
                    key={months}
                    type="button"
                    onClick={() => setContractMonths(months)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      contractMonths === months
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {months} meses
                  </button>
                ))}
              </div>
            </div>

            {/* Law 31 Note */}
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-400 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p>
                <strong>Tasa Primera Categoría 27%:</strong> El canon de arriendo se deduce al 100% como gasto necesario para producir la renta en el ejercicio comercial sin topar límites de depreciación de activos fijos.
              </p>
            </div>

          </div>

          {/* Analysis Results (Right Column) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Impact Banner */}
            <div className="bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/40 rounded-2xl p-6 shadow-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                    Capital de Trabajo Liberado (Sin CapEx)
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white mt-1">
                    {formatCLP(analysis.freedCapital)}
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Dinero no inmovilizado en compra de vehículos que tu empresa puede destinar a inventario, sucursales, combustible o expansión.
                  </p>
                </div>

                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                    Escudo Tributario SII (Ahorro Fiscal Directo)
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 mt-1">
                    {formatCLP(analysis.taxShieldRenting)}
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Rebaja tributaria efectiva al 27% sobre el total de cuotas pagadas en {contractMonths} meses.
                  </p>
                </div>
              </div>
            </div>

            {/* Side-by-Side Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Card 1: Compra Directa / CapEx */}
              <div className="bg-slate-900/90 border border-red-950/40 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-red-400 uppercase flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" />
                    <span>Compra / Crédito (CapEx)</span>
                  </span>
                  <span className="text-xs font-mono text-slate-400">Riesgo Empresa</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Desembolso Inicial en Flota:</span>
                    <span className="font-mono text-slate-200">{formatCLP(analysis.totalPurchaseCapex)}</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Carrozado / Frío / Grúa x {vehicleCount}:</span>
                    <span className="font-mono text-slate-200">{formatCLP(vehicleCount * 3800000)}</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Mantenciones & Seguros Comerciales:</span>
                    <span className="font-mono text-slate-200">{formatCLP(vehicleCount * 390000 * contractMonths)}</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-800/60 text-red-400">
                    <span>Desgaste & Depreciación Comercial:</span>
                    <span className="font-mono">-40% Valor Reventa</span>
                  </div>

                  <div className="flex justify-between py-1 text-slate-400">
                    <span>Vehículo de Reemplazo en Pana:</span>
                    <span className="text-red-400 font-semibold">Costo adicional</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 leading-normal">
                  Inmoviliza líneas de crédito bancarias y sobrecarga al equipo con gestión de talleres mecánicos y paralización de entregas.
                </div>
              </div>

              {/* Card 2: Renting Operativo WORKUP */}
              <div className="bg-slate-900/90 border border-emerald-950/60 rounded-2xl p-5 space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
                
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Renting WORKUP (OpEx)</span>
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded">
                    Full Servicio
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Inversión Inicial (Pie):</span>
                    <span className="font-mono text-emerald-400 font-bold">$0 CLP</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Equipamiento & Carrozado:</span>
                    <span className="text-emerald-400 font-semibold">100% Incluido</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Mantenciones Preventivas & Correctivas:</span>
                    <span className="text-emerald-400 font-semibold">100% Incluido</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Seguro B2B Todo Riesgo + Grúa:</span>
                    <span className="text-emerald-400 font-semibold">100% Incluido</span>
                  </div>

                  <div className="flex justify-between py-1 text-slate-400">
                    <span>Reemplazo Inmediato Garantizado:</span>
                    <span className="text-emerald-400 font-semibold">Garantizado por SLA</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300 font-medium">
                  Cuota fija 100% predecible en UF o CLP, facturación directa y renovación continua para mantener tu operación siempre en marcha.
                </div>
              </div>

            </div>

            {/* Bottom CTA */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <div className="text-xs font-bold text-white">¿Deseas una evaluación financiera a la medida de tu empresa?</div>
                <div className="text-[11px] text-slate-400">Nuestros ingenieros comerciales preparan el flujo de caja comparativo en menos de 2 horas.</div>
              </div>
              <button
                type="button"
                onClick={onGoToQuote}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl transition-all shadow-md shadow-amber-500/20 shrink-0 flex items-center gap-2"
              >
                <span>Cotizar con Escudo Tributario</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
