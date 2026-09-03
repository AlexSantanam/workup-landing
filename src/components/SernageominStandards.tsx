import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Radio, 
  Cpu, 
  Wrench, 
  FileCheck2, 
  Truck, 
  AlertTriangle, 
  Clock, 
  Lock, 
  Eye,
  Sliders,
  ChevronRight,
  Activity,
  ThermometerSnowflake,
  PackageCheck,
  Anchor
} from 'lucide-react';
import { EQUIPMENT_CATALOG, ACCREDITATION_SYSTEMS } from '../data/fleetData';

export const SernageominStandards: React.FC = () => {
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string>('eq_frio');
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Todos los Equipamientos' },
    { id: 'Alimentos & Frío', label: 'Cadena de Frío & Panaderías' },
    { id: 'Grúas & Carga', label: 'Grúas & Fletes Pesados' },
    { id: 'Logística & Courier', label: 'Logística & Distribución' },
    { id: 'Seguridad Minera DS 132', label: 'Estándar Minero DS 132' },
  ];

  const filteredEquipment = selectedCategoryTab === 'all'
    ? EQUIPMENT_CATALOG
    : EQUIPMENT_CATALOG.filter((eq) => eq.category === selectedCategoryTab);

  const activeEquipment = EQUIPMENT_CATALOG.find(
    (e) => e.id === selectedEquipmentId
  ) || filteredEquipment[0] || EQUIPMENT_CATALOG[0];

  return (
    <section id="estandar-minero" className="py-16 lg:py-24 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Wrench className="w-4 h-4" />
            <span>Equipamiento Técnico Homologado • Certificación Nacional</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white">
            Ingeniería y Adaptación a Medida para Cada Industria
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Entregamos furgones, camiones y camionetas listos para operar desde el día uno: sistemas de refrigeración para alimentos y panaderías, rampas para courier, grúas pluma de alta capacidad y kits mineros SERNAGEOMIN DS 132.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          {/* Pillar 1 */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-6 hover:border-amber-500/40 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <ThermometerSnowflake className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold font-heading text-white">
              Cadena de Frío & Panaderías
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Equipos de frío Thermo King / Carrier hasta -20°C, aislamiento térmico poliuretano y piso diamantado de fácil lavado sanitario (Seremi de Salud).
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-6 hover:border-amber-500/40 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Anchor className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold font-heading text-white">
              Grúas Pluma & Gran Volumen
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Camiones con grúas articuladas certificadas SEC, winches de rescate y carrocerías de hasta 60 m³ para traslados y fletes interurbanos.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-6 hover:border-amber-500/40 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold font-heading text-white">
              Logística & Courier Rápido
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Furgones con rampas electrohidráulicas de 1.000 kg, cerraduras inviolables, sensores de apertura y telemetría de ruta para paquetería de alta exigencia.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-6 hover:border-amber-500/40 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold font-heading text-white">
              Estándar DS 132 Minería
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Barra antivuelco ROPS, pértiga LED, radio VHF Motorola con canales mina, DSS detector de fatiga por IA y bloqueo LOTO homologado en faenas.
            </p>
          </div>

        </div>

        {/* Interactive Equipment Explorer */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-amber-400" />
                <span>Explorador de Equipamiento Técnico y Aditamentos</span>
              </h3>
              <p className="text-xs text-slate-400">
                Selecciona cualquier accesorio o equipamiento para inspeccionar sus especificaciones técnicas y beneficios para tu operación.
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30">
              <ShieldCheck className="w-4 h-4" />
              <span>Instalación Certificada de Fábrica</span>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategoryTab(cat.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  selectedCategoryTab === cat.id
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Quick Equipment List Selector */}
            <div className="lg:col-span-5 space-y-2 max-h-[420px] overflow-y-auto pr-2">
              {filteredEquipment.map((item) => {
                const isSelected = item.id === (activeEquipment?.id || selectedEquipmentId);

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedEquipmentId(item.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500 text-white shadow-md'
                        : 'bg-slate-900 border-slate-800/80 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                      <div>
                        <span className="text-xs font-bold block">{item.name}</span>
                        <span className="text-[10px] text-slate-400">{item.category}</span>
                      </div>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-amber-400' : 'text-slate-600'}`} />
                  </button>
                );
              })}
            </div>

            {/* Right: Detailed Component Spec Card */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-700/80 rounded-2xl p-6 space-y-4">
              
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-extrabold tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full">
                  {activeEquipment.category}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Certificación Vigente</span>
                </span>
              </div>

              <h4 className="text-xl font-bold font-heading text-white">
                {activeEquipment.name}
              </h4>

              <p className="text-sm text-slate-300 leading-relaxed">
                {activeEquipment.description}
              </p>

              {/* Technical Specifications Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 uppercase font-bold block mb-1">
                    Especificación Técnica:
                  </span>
                  <span className="text-xs font-mono font-semibold text-amber-300">
                    {activeEquipment.spec}
                  </span>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 uppercase font-bold block mb-1">
                    Normativa / Aplicación:
                  </span>
                  <span className="text-xs font-semibold text-white">
                    {activeEquipment.mandatoryBy}
                  </span>
                </div>
              </div>

              {/* Safety & Quality notice */}
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Todos los aditamentos son instalados por técnicos certificados, garantizando calibración exacta, compatibilidad eléctrica y garantía extendida durante todo el periodo de renting.
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* Accreditation Platforms Strip */}
        <div className="mt-12 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-6 text-center space-y-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
            Plataformas de Homologación & Acreditación de Proveedores en Chile:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {ACCREDITATION_SYSTEMS.map((sys, idx) => (
              <div 
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col items-center justify-center space-y-1 hover:border-amber-500/40 transition-colors"
              >
                <span className="text-xs font-extrabold text-white">{sys.name}</span>
                <span className="text-[10px] text-amber-400 font-semibold">{sys.status}</span>
                <span className="text-[9px] text-slate-400">{sys.desc}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
