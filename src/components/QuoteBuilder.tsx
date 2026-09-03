import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  Plus, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Printer, 
  Download, 
  MessageSquare,
  Sparkles,
  Info,
  Truck,
  Wrench,
  ThermometerSnowflake,
  Anchor
} from 'lucide-react';
import { QuoteItem, Vehicle } from '../types';
import { FLEET_VEHICLES, REGIONS_AND_FAENAS, FLEET_ADDONS } from '../data/fleetData';
import { formatRUT, validateRUT, isCorporateEmail } from '../utils/rutValidator';
import { 
  formatCurrency, 
  formatCLP, 
  formatUF, 
  ufToClp, 
  CURRENT_UF_VALUE_CLP,
  CHILEAN_IVA_RATE,
  CORPORATE_TAX_RATE 
} from '../utils/currency';
import { WorkupLogo } from './WorkupLogo';

interface QuoteBuilderProps {
  currency: 'UF' | 'CLP';
  quoteItems: QuoteItem[];
  onUpdateQuantity: (vehicleId: string, delta: number) => void;
  onRemoveItem: (vehicleId: string) => void;
  onAddVehicleToQuote: (vehicle: Vehicle) => void;
}

export const QuoteBuilder: React.FC<QuoteBuilderProps> = ({
  currency,
  quoteItems,
  onUpdateQuantity,
  onRemoveItem,
  onAddVehicleToQuote,
}) => {
  // Form States
  const [companyName, setCompanyName] = useState('');
  const [companyRut, setCompanyRut] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactRole, setContactRole] = useState('Gerente de Operaciones / Logística');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('+56 9 ');
  const [selectedRegionId, setSelectedRegionId] = useState('santiago_logistica');
  const [termMonths, setTermMonths] = useState(24);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([
    'addon_telemetry_dss',
    'addon_cold_maintenance',
    'addon_mantenimiento_preventivo',
  ]);
  const [additionalNotes, setAdditionalNotes] = useState('');

  // Validation States
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedQuote, setSubmittedQuote] = useState<{
    id: string;
    createdAt: string;
    companyName: string;
    companyRut: string;
    contactName: string;
    contactRole: string;
    contactEmail: string;
    contactPhone: string;
    regionName: string;
    termMonths: number;
    items: QuoteItem[];
    addons: string[];
    totalUFMonthly: number;
    totalCLPMonthly: number;
    taxShieldMonthlyCLP: number;
  } | null>(null);

  // Quick vehicle selector to add into cart
  const [vehicleToAddId, setVehicleToAddId] = useState<string>(FLEET_VEHICLES[0].id);

  // Calculations
  const rutValidation = useMemo(() => validateRUT(companyRut), [companyRut]);
  const emailIsCorp = useMemo(() => isCorporateEmail(contactEmail), [contactEmail]);

  const vehiclesMonthlyUF = useMemo(() => {
    return quoteItems.reduce((acc, item) => acc + item.vehicle.monthlyUF * item.quantity, 0);
  }, [quoteItems]);

  const totalVehicleUnits = useMemo(() => {
    return quoteItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [quoteItems]);

  const addOnsMonthlyUF = useMemo(() => {
    return selectedAddOns.reduce((acc, addonId) => {
      const addon = FLEET_ADDONS.find((a) => a.id === addonId);
      return acc + (addon ? addon.priceUF * (totalVehicleUnits || 1) : 0);
    }, 0);
  }, [selectedAddOns, totalVehicleUnits]);

  // Term discount: 36+ months gets 5% discount, 1-3 months spot has 10% premium
  const termMultiplier = useMemo(() => {
    if (termMonths <= 3) return 1.10;
    if (termMonths >= 36) return 0.95;
    return 1.0;
  }, [termMonths]);

  const totalMonthlyUF = useMemo(() => {
    return Number(((vehiclesMonthlyUF + addOnsMonthlyUF) * termMultiplier).toFixed(2));
  }, [vehiclesMonthlyUF, addOnsMonthlyUF, termMultiplier]);

  const totalMonthlyCLP = useMemo(() => {
    return ufToClp(totalMonthlyUF);
  }, [totalMonthlyUF]);

  const taxShieldMonthlyCLP = useMemo(() => {
    return Math.round(totalMonthlyCLP * CORPORATE_TAX_RATE);
  }, [totalMonthlyCLP]);

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setCompanyRut(formatRUT(raw));
  };

  const toggleAddOn = (addonId: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const handleAddVehicleDirect = () => {
    const v = FLEET_VEHICLES.find((x) => x.id === vehicleToAddId);
    if (v) {
      onAddVehicleToQuote(v);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      companyName: true,
      companyRut: true,
      contactName: true,
      contactEmail: true,
      contactPhone: true,
    });

    if (!companyName.trim()) return;
    if (!rutValidation.isValid) return;
    if (!contactName.trim()) return;
    if (!contactEmail.trim() || !contactEmail.includes('@')) return;
    if (!contactPhone.trim() || contactPhone.length < 8) return;
    if (quoteItems.length === 0) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const region = REGIONS_AND_FAENAS.find((r) => r.id === selectedRegionId);
      const randomIdNum = Math.floor(1000 + Math.random() * 9000);
      const quoteId = `COT-B2B-2026-${randomIdNum}`;

      setSubmittedQuote({
        id: quoteId,
        createdAt: new Date().toLocaleDateString('es-CL', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        companyName,
        companyRut,
        contactName,
        contactRole,
        contactEmail,
        contactPhone,
        regionName: region ? region.name : 'Zona Central & Logística',
        termMonths,
        items: [...quoteItems],
        addons: [...selectedAddOns],
        totalUFMonthly: totalMonthlyUF,
        totalCLPMonthly: totalMonthlyCLP,
        taxShieldMonthlyCLP,
      });

      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="cotizar" className="py-16 lg:py-24 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <FileText className="w-4 h-4" />
            <span>Configurador & Cotizador B2B</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white">
            Cotización Formal de Flota Corporativa y Logística
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Configura furgones, camiones con grúa, unidades refrigeradas o camionetas 4x4. Deduce el 100% de la cuota mensual como gasto tributario operativo (OpEx).
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Fleet Selection & Config (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* 1. Vehicle Selection Box */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                      1
                    </span>
                    <h3 className="text-base font-bold font-heading text-white">
                      Vehículos Seleccionados para la Flota
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-amber-400 font-bold">
                    {totalVehicleUnits} {totalVehicleUnits === 1 ? 'Unidad' : 'Unidades en total'}
                  </span>
                </div>

                {quoteItems.length === 0 ? (
                  <div className="p-8 text-center border-2 border-dashed border-slate-800 rounded-xl space-y-3">
                    <Truck className="w-10 h-10 text-slate-600 mx-auto" />
                    <p className="text-xs text-slate-400">
                      No has agregado vehículos a la cotización todavía.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <select
                        value={vehicleToAddId}
                        onChange={(e) => setVehicleToAddId(e.target.value)}
                        className="bg-slate-900 border border-slate-700 text-xs rounded-xl px-3 py-2 text-white max-w-xs"
                      >
                        {FLEET_VEHICLES.map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.model} ({formatCurrency(v.monthlyUF, currency)})
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={handleAddVehicleDirect}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Agregar a Flota</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {quoteItems.map((item) => (
                      <div
                        key={item.vehicleId}
                        className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.vehicle.image}
                            alt={item.vehicle.model}
                            className="w-14 h-12 object-cover rounded-lg border border-slate-800 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="text-xs font-bold text-white line-clamp-1">
                              {item.vehicle.model}
                            </div>
                            <div className="text-[11px] text-amber-400 font-mono">
                              {formatCurrency(item.vehicle.monthlyUF, currency)} / unidad / mes
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                          {/* Quantity Controls */}
                          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.vehicleId, -1)}
                              className="px-2.5 py-1 text-slate-300 hover:text-white font-bold text-xs"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-xs font-bold text-white">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.vehicleId, 1)}
                              className="px-2.5 py-1 text-slate-300 hover:text-white font-bold text-xs"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-right min-w-[90px]">
                            <span className="text-xs font-bold font-mono text-white block">
                              {formatCurrency(item.vehicle.monthlyUF * item.quantity, currency)}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.vehicleId)}
                            className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                            title="Eliminar de cotización"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Add More Vehicles Row */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-1 min-w-[240px]">
                        <select
                          value={vehicleToAddId}
                          onChange={(e) => setVehicleToAddId(e.target.value)}
                          className="bg-slate-900 border border-slate-700 text-xs rounded-xl px-3 py-2 text-slate-200 w-full"
                        >
                          {FLEET_VEHICLES.map((v) => (
                            <option key={v.id} value={v.id}>
                              + {v.model} ({formatCurrency(v.monthlyUF, currency)})
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={handleAddVehicleDirect}
                          className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 whitespace-nowrap"
                        >
                          + Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Destination & Term */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                    2
                  </span>
                  <h3 className="text-base font-bold font-heading text-white">
                    Plazo y Zona de Operación
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Región / Base de Operaciones
                    </label>
                    <select
                      value={selectedRegionId}
                      onChange={(e) => setSelectedRegionId(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-amber-500"
                    >
                      {REGIONS_AND_FAENAS.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name} (SLA &lt; {r.slaHours}h)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Plazo del Contrato
                    </label>
                    <select
                      value={termMonths}
                      onChange={(e) => setTermMonths(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-amber-500"
                    >
                      <option value={3}>1 a 3 meses (Spot / Proyecto temporal)</option>
                      <option value={6}>6 meses (Semestral)</option>
                      <option value={12}>12 meses (Anual)</option>
                      <option value={24}>24 meses (Largo Plazo estándar)</option>
                      <option value={36}>36 meses (Flota Dedicada -5% dto.)</option>
                      <option value={48}>48 meses (Full Renting Operativo -5% dto.)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 3. Add-Ons Checklist */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                      3
                    </span>
                    <h3 className="text-base font-bold font-heading text-white">
                      Aditamentos, Equipamiento & Servicios Adicionales
                    </h3>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                    Personalizable
                  </span>
                </div>

                <div className="space-y-2.5">
                  {FLEET_ADDONS.map((addon) => {
                    const isChecked = selectedAddOns.includes(addon.id);

                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddOn(addon.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                          isChecked
                            ? 'bg-amber-500/10 border-amber-500/80 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // handled by parent onClick
                          className="mt-0.5 h-4 w-4 rounded border-slate-700 text-amber-500 focus:ring-amber-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">{addon.name}</span>
                            <span className="text-xs font-mono font-bold text-amber-400">
                              {addon.priceUF === 0 ? 'Sin Costo' : `+ ${formatUF(addon.priceUF)} / mes`}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            {addon.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Column: Company Data & Pricing Summary (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Company Info Box */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                    4
                  </span>
                  <h3 className="text-base font-bold font-heading text-white">
                    Datos de la Empresa y Solicitante
                  </h3>
                </div>

                <div className="space-y-3.5 text-xs">
                  
                  {/* Razón Social */}
                  <div>
                    <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Razón Social de la Empresa *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Ej. Distribuidora Central SpA / Transportes del Norte"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500"
                      />
                      <Building2 className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
                    </div>
                  </div>

                  {/* RUT Empresa */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="font-bold text-slate-300 uppercase tracking-wider">
                        RUT Empresa *
                      </label>
                      {companyRut && (
                        <span className={`text-[10px] font-bold ${rutValidation.isValid ? 'text-emerald-400' : 'text-red-400'}`}>
                          {rutValidation.message}
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      required
                      value={companyRut}
                      onChange={handleRutChange}
                      placeholder="76.123.456-K"
                      className={`w-full bg-slate-900 border rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:ring-2 font-mono ${
                        companyRut && !rutValidation.isValid
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-slate-700 focus:ring-amber-500'
                      }`}
                    />
                  </div>

                  {/* Contact Name & Role */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Nombre Contacto *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Ej. Roberto Araya"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Cargo en Empresa *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactRole}
                        onChange={(e) => setContactRole(e.target.value)}
                        placeholder="Ej. Gerente de Operaciones"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  {/* Corporate Email & Mobile Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Email Corporativo *
                      </label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="nombre@empresa.cl"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500"
                      />
                      {contactEmail && !emailIsCorp && (
                        <span className="text-[10px] text-amber-400 mt-1 block">
                          Recomendado: Usar correo con dominio de empresa (@empresa.cl)
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Teléfono Móvil *
                      </label>
                      <input
                        type="tel"
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="+56 9 1234 5678"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 font-mono"
                      />
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Requisitos Especiales de Carga o Ruta
                    </label>
                    <textarea
                      rows={2}
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      placeholder="Ej. Fletes de gran volumen entre Santiago y Puerto Montt, furgones con rampa para paquetería express o kit frío -18°C..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                </div>
              </div>

              {/* Economic Summary Box */}
              <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-amber-500/40 rounded-2xl p-6 shadow-2xl space-y-4">
                
                <h4 className="text-sm font-bold font-heading text-white uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center justify-between">
                  <span>Resumen Económico Mensual</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded font-bold">
                    100% OpEx SII
                  </span>
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Canon Vehículos ({totalVehicleUnits} unidades):</span>
                    <span className="font-mono font-bold text-white">
                      {formatCurrency(vehiclesMonthlyUF, currency)}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span>Aditamentos & Telemetría:</span>
                    <span className="font-mono text-white">
                      {formatCurrency(addOnsMonthlyUF, currency)}
                    </span>
                  </div>

                  {termMonths >= 36 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Descuento Plazo Largo ({termMonths}m):</span>
                      <span className="font-mono font-bold">-5%</span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                    <div>
                      <span className="text-xs font-bold text-amber-400 block uppercase">
                        Cuota Mensual Neta:
                      </span>
                      <span className="text-[10px] text-slate-400">Facturación mensual + 19% IVA</span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-extrabold font-mono text-white">
                        {formatCurrency(totalMonthlyUF, currency)}
                      </div>
                      <div className="text-xs font-mono text-slate-400">
                        {currency === 'UF' ? formatCLP(totalMonthlyCLP) : formatUF(totalMonthlyUF)}
                      </div>
                    </div>
                  </div>

                  {/* Tax shield notice */}
                  <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-[11px] text-emerald-300 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong>Escudo Tributario Mensual Estimado:</strong> Rebaja directa de{' '}
                      <span className="font-mono font-bold text-white">{formatCLP(taxShieldMonthlyCLP)}</span>{' '}
                      al mes en tu declaración de Primera Categoría (27%).
                    </div>
                  </div>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting || quoteItems.length === 0}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Generando Cotización Formal...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-slate-950" />
                      <span>Solicitar Cotización Formal & Ficha</span>
                    </>
                  )}
                </button>

                <div className="text-center text-[10px] text-slate-400">
                  Respuesta formal emitida con firma digital de Gerencia Comercial en menos de 2 horas hábiles.
                </div>

              </div>

            </div>

          </div>
        </form>

      </div>

      {/* Confirmation Modal */}
      {submittedQuote && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
          <div 
            className="bg-slate-900 border border-amber-500/40 w-full max-w-2xl rounded-2xl shadow-2xl p-6 sm:p-8 text-white space-y-6 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 block">
                Solicitud Registrada con Éxito
              </span>
              <h3 className="text-2xl font-bold font-heading text-white">
                Cotización Formal #{submittedQuote.id}
              </h3>
              <p className="text-xs text-slate-400">
                Emitida el {submittedQuote.createdAt} para {submittedQuote.companyName} (RUT: {submittedQuote.companyRut})
              </p>
            </div>

            {/* Voucher Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <WorkupLogo variant="full" markHeight={28} theme="dark" />
                <span className="text-[10px] font-mono bg-slate-900 border border-slate-700 text-amber-400 px-2.5 py-1 rounded-full font-bold">
                  Documento Oficial B2B
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-slate-400 block text-[11px]">Solicitante:</span>
                  <span className="font-bold text-white">{submittedQuote.contactName}</span>
                  <span className="text-slate-400 block text-[10px]">{submittedQuote.contactRole}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Zona / Base:</span>
                  <span className="font-bold text-white">{submittedQuote.regionName}</span>
                  <span className="text-amber-400 block text-[10px] font-mono">Plazo: {submittedQuote.termMonths} meses</span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                <span className="font-bold text-slate-300 uppercase tracking-wider block text-[10px]">
                  Flota Detallada:
                </span>
                {submittedQuote.items.map((it) => (
                  <div key={it.vehicleId} className="flex justify-between items-center py-1 border-b border-slate-900">
                    <span className="text-slate-200">
                      <strong>{it.quantity}x</strong> {it.vehicle.model}
                    </span>
                    <span className="font-mono text-amber-400 font-bold">
                      {formatCurrency(it.vehicle.monthlyUF * it.quantity, currency)} / mes
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Final */}
              <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                <span className="font-bold text-white text-sm">Canon Total Mensual (OpEx):</span>
                <div className="text-right">
                  <span className="text-xl font-extrabold font-mono text-amber-400">
                    {formatCurrency(submittedQuote.totalUFMonthly, currency)}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    {currency === 'UF' ? formatCLP(submittedQuote.totalCLPMonthly) : formatUF(submittedQuote.totalUFMonthly)} + IVA
                  </span>
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href={`https://wa.me/56984501200?text=${encodeURIComponent(
                  `Hola WORKUP, requiero asistencia para la cotización ${submittedQuote.id} (${submittedQuote.companyName} - RUT ${submittedQuote.companyRut}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-600/20"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Contactar Ejecutivo Comercial WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => window.print()}
                className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 flex items-center justify-center gap-2 transition-colors"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>Imprimir / Guardar PDF</span>
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setSubmittedQuote(null)}
                className="text-xs text-slate-400 hover:text-white underline"
              >
                Cerrar y volver a la plataforma
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
