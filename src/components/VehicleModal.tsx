import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  Download, 
  Truck, 
  Users, 
  Scale, 
  Fuel, 
  Gauge, 
  Radio, 
  Zap, 
  AlertTriangle,
  FileCheck2,
  ExternalLink,
  ChevronRight,
  ThermometerSnowflake,
  Wrench,
  PackageCheck
} from 'lucide-react';
import { Vehicle, EquipmentDetail } from '../types';
import { formatCurrency } from '../utils/currency';

interface VehicleModalProps {
  vehicle: Vehicle | null;
  currency: 'UF' | 'CLP';
  onClose: () => void;
  onAddToQuote: (vehicle: Vehicle) => void;
}

export const VehicleModal: React.FC<VehicleModalProps> = ({
  vehicle,
  currency,
  onClose,
  onAddToQuote,
}) => {
  const [activeTab, setActiveTab] = useState<'checklist' | 'specs' | 'accreditation'>('checklist');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!vehicle) return null;

  const handleDownloadDossier = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const isMiningVehicle = vehicle.category === 'pickups' || vehicle.targetSectors?.includes('mineria_energia');

  const equipmentItems = vehicle.equipmentList || [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden text-white my-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-heading text-white">{vehicle.model}</h3>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded border border-amber-500/30">
                  {vehicle.categoryLabel}
                </span>
              </div>
              <p className="text-xs text-slate-400">{vehicle.brand} • {vehicle.engine}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-900/60 px-6 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('checklist')}
            className={`py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'checklist'
                ? 'border-amber-500 text-amber-400 bg-slate-800/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Equipamiento Técnico ({equipmentItems.length} ítems)</span>
          </button>
          
          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'specs'
                ? 'border-amber-500 text-amber-400 bg-slate-800/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Gauge className="w-4 h-4" />
            <span>Ficha Técnica & Capacidades</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('accreditation')}
            className={`py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'accreditation'
                ? 'border-amber-500 text-amber-400 bg-slate-800/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Homologación & Sectores ({vehicle.homologations.length})</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          
          {/* TAB 1: EQUIPMENT CHECKLIST */}
          {activeTab === 'checklist' && (
            <div className="space-y-6">
              
              {/* Notice Banner */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3.5">
                <Wrench className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-amber-300">
                    Equipamiento Técnico 100% Configurado e Incluido en la Cuota
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Esta unidad se entrega equipada y lista para la operación de tu empresa (logística de reparto, panadería con frío, grúa de rescate, fletes o estándar minero), con mantenimiento preventivo incluido.
                  </p>
                </div>
              </div>

              {/* Equipment Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {equipmentItems.map((item: EquipmentDetail, index: number) => (
                  <div 
                    key={item?.id || index}
                    className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl flex items-start justify-between gap-3 hover:border-slate-700 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-xs font-bold text-white">{item?.name || 'Equipamiento Homologado'}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 pl-6 leading-normal">
                        {item?.description || 'Equipamiento certificado para operación profesional.'}
                      </p>
                      <div className="pl-6 pt-1 flex flex-wrap gap-2 text-[10px]">
                        {item?.spec && (
                          <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                            {item.spec}
                          </span>
                        )}
                        <span className="text-amber-400/90 font-semibold">
                          Aplicación: {item?.mandatoryBy || 'Estándar Corporativo B2B'}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded shrink-0">
                      Incluido
                    </span>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 2: TECHNICAL SPECS */}
          {activeTab === 'specs' && (
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Photo & Quick Overview */}
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden border border-slate-800 h-56 bg-slate-950">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.model}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-sm px-3 py-1 rounded-lg border border-slate-800 text-xs font-bold text-amber-400">
                      {vehicle.traction}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {vehicle.shortDesc}
                  </p>

                  <div className="space-y-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider block">
                      Características Destacadas:
                    </span>
                    <ul className="space-y-1.5">
                      {vehicle.keyFeatures.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Specs Table */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800 pb-2">
                    Ficha Técnica y Dimensiones
                  </h4>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Motorización:</span>
                      <span className="font-semibold text-white">{vehicle.engine}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px]">Transmisión:</span>
                      <span className="font-semibold text-white">{vehicle.transmission}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px]">Tipo de Tracción:</span>
                      <span className="font-semibold text-white">{vehicle.traction}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px]">Combustible / Emisión:</span>
                      <span className="font-semibold text-white">{vehicle.fuel}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px]">Capacidad de Ocupantes:</span>
                      <span className="font-semibold text-white">{vehicle.seats} ocupantes</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px]">Capacidad de Carga Útil:</span>
                      <span className="font-semibold text-white font-mono">{vehicle.payloadKg.toLocaleString('es-CL')} kg</span>
                    </div>

                    {vehicle.cargoVolumeM3 && (
                      <div>
                        <span className="text-slate-400 block text-[11px]">Volumen de Carga:</span>
                        <span className="font-semibold text-amber-400 font-mono">{vehicle.cargoVolumeM3} m³</span>
                      </div>
                    )}

                    {vehicle.refrigeratedOption && (
                      <div>
                        <span className="text-slate-400 block text-[11px]">Rango de Temperatura Frío:</span>
                        <span className="font-semibold text-cyan-400 font-mono">-5°C a +15°C</span>
                      </div>
                    )}

                    {vehicle.craneCapacityTon && (
                      <div>
                        <span className="text-slate-400 block text-[11px]">Capacidad Grúa Pluma:</span>
                        <span className="font-semibold text-amber-400 font-mono">{vehicle.craneCapacityTon} Ton / m</span>
                      </div>
                    )}

                    <div>
                      <span className="text-slate-400 block text-[11px]">Dimensiones (L x An x Al):</span>
                      <span className="font-semibold text-white font-mono text-[11px]">
                        {vehicle.dimensions.lengthMm} x {vehicle.dimensions.widthMm} x {vehicle.dimensions.heightMm} mm
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                    * Mantenimiento preventivo por pauta oficial del fabricante incluido cada 10.000 a 20.000 km, con repuestos originales y asistencia 24/7 en ruta.
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: ACCREDITATION & MANDANTES */}
          {activeTab === 'accreditation' && (
            <div className="space-y-5">
              
              <div>
                <h4 className="text-sm font-bold text-white mb-1">
                  Homologación y Sectores de Aplicación
                </h4>
                <p className="text-xs text-slate-400">
                  Esta unidad cumple con los requerimientos operativos y normativos de las siguientes industrias y mandantes en Chile:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {vehicle.homologations.map((homo, idx) => (
                  <div 
                    key={idx}
                    className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">
                      ✓
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{homo}</div>
                      <div className="text-[10px] text-emerald-400">Acreditación e ingreso garantizado</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Digital Dossier Box */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-amber-400 shrink-0" />
                  <div>
                    <h5 className="text-xs font-bold text-white">
                      Dossier Técnico Digitalizado
                    </h5>
                    <p className="text-[11px] text-slate-400">
                      Ficha técnica oficial, certificado de equipamiento, revisión técnica vigente y póliza de seguro de cobertura completa.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDownloadDossier}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-2 shrink-0 transition-colors"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>{downloadSuccess ? '✓ Ficha Generada' : 'Descargar Ficha PDF'}</span>
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer Bar */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-400 block">Cuota mensual de Renting Operativo:</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold font-mono text-amber-400">
                {formatCurrency(vehicle.monthlyUF, currency)}
              </span>
              <span className="text-[11px] text-slate-400 font-normal">
                (100% Gasto Deducible OpEx SII)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-colors"
            >
              Cerrar
            </button>
            <button
              type="button"
              onClick={() => {
                onAddToQuote(vehicle);
                onClose();
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-extrabold rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
            >
              <span>Agregar este Modelo a Cotización</span>
              <ChevronRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
