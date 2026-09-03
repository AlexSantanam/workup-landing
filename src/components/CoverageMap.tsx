import React, { useState } from 'react';
import { 
  MapPin, 
  PhoneCall, 
  Clock, 
  Truck, 
  ShieldCheck, 
  Building2, 
  ChevronRight, 
  CheckCircle2,
  Navigation,
  Warehouse
} from 'lucide-react';
import { REGIONS_AND_FAENAS } from '../data/fleetData';
import { RegionFaena } from '../types';

export const CoverageMap: React.FC = () => {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('santiago_logistica');

  const selectedRegion = REGIONS_AND_FAENAS.find((r) => r.id === selectedRegionId) || REGIONS_AND_FAENAS[0];

  return (
    <section id="cobertura" className="py-16 lg:py-24 bg-slate-950 text-white relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Cobertura Logística Nacional & Red de Asistencia</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white">
              Centros de Distribución, Talleres y Respaldo en Ruta
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Presencia en los principales corredores logísticos, puertos, parques industriales y centros de distribución de Chile. Tiempo de respuesta garantizado por contrato (SLA).
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-semibold">6 Bases Nacionales</span>
            <span className="text-slate-500">•</span>
            <span className="text-amber-400 font-bold">115 Móviles de Auxilio en Ruta</span>
          </div>
        </div>

        {/* Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Region Tabs & Selector (Left) */}
          <div className="lg:col-span-5 space-y-2.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Selecciona una Base / Corredor:
            </span>

            {REGIONS_AND_FAENAS.map((region) => {
              const isSelected = region.id === selectedRegionId;

              return (
                <button
                  key={region.id}
                  type="button"
                  onClick={() => setSelectedRegionId(region.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{region.baseCity}</div>
                      <div className="text-[11px] text-slate-400">{region.region}</div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[11px] font-mono font-bold text-amber-400 block">
                      SLA &lt; {region.slaHours}h
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {region.mobileUnits} Móviles
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Region Full Details (Right) */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            
            {/* Header of Active Base */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                  {selectedRegion.region}
                </span>
                <h3 className="text-2xl font-bold font-heading text-white mt-1">
                  {selectedRegion.baseCity}
                </h3>
              </div>

              <div className="flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
                <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-semibold">SLA de Respuesta en Ruta</span>
                  <span className="text-sm font-bold font-mono text-emerald-400">&lt; {selectedRegion.slaHours} Horas</span>
                </div>
              </div>
            </div>

            {/* Address & Emergency Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 uppercase font-bold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ubicación Base / Taller Central</span>
                </span>
                <p className="text-xs text-white font-medium">
                  {selectedRegion.address}
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 uppercase font-bold flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                  <span>Central de Operaciones & Asistencia</span>
                </span>
                <a 
                  href={`tel:${selectedRegion.phone.replace(/[^0-9+]/g, '')}`} 
                  className="text-xs text-amber-400 font-mono font-bold block hover:underline"
                >
                  {selectedRegion.phone}
                </a>
              </div>
            </div>

            {/* Major Corridors & Centers Covered in this Zone */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Zonas Logísticas, Faenas y Parques Industriales con Asistencia Prioritaria:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedRegion.majorMines.map((zone, idx) => (
                  <div 
                    key={idx}
                    className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-2.5 text-xs text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-semibold">{zone}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Fleet Infrastructure */}
            <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">
                    {selectedRegion.mobileUnits} Unidades de Rescate y Taller Móvil Asignadas
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Unidades de soporte con diagnóstico electrónico, cambio de neumáticos pesados, lubricación y repuestos de alta rotación.
                  </div>
                </div>
              </div>

              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/30 whitespace-nowrap">
                Cobertura 24/7
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
