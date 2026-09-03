import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  MapPin, 
  Calendar, 
  Truck, 
  ChevronRight, 
  ArrowRight,
  Zap,
  Radio,
  FileCheck
} from 'lucide-react';
import { REGIONS_AND_FAENAS, FLEET_VEHICLES } from '../data/fleetData';
import { formatCurrency } from '../utils/currency';

interface HeroSectionProps {
  currency: 'UF' | 'CLP';
  onQuickQuote: (config: {
    category: string;
    regionId: string;
    termMonths: number;
    quantity: number;
  }) => void;
  onExploreFleet: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currency,
  onQuickQuote,
  onExploreFleet,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('furgones');
  const [selectedRegion, setSelectedRegion] = useState('metropolitana');
  const [selectedTerm, setSelectedTerm] = useState(24);
  const [quantity, setQuantity] = useState(3);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuickQuote({
      category: selectedCategory,
      regionId: selectedRegion,
      termMonths: selectedTerm,
      quantity,
    });
  };

  return (
    <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden py-12 lg:py-20 border-b border-slate-800">
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: B2B Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Regulatory & Sector Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wide shadow-sm">
              <Truck className="w-4 h-4 text-amber-400" />
              <span>FLOTAS COMERCIALES • LOGÍSTICA • PANADERÍAS • CAMIONES & GRÚAS • MINERÍA</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight leading-[1.15]">
              Renting de Furgones, Camiones y Flotas{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">
                para Empresas en Chile
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              Arriendos mensuales y contratos de largo plazo a la medida: furgones para courier tipo <strong className="text-white">Blue Express</strong>, distribución para <strong className="text-white">panaderías y alimentos</strong>, camiones para <strong className="text-white">fletes de gran volumen</strong>, camiones con <strong className="text-white">servicio de grúa</strong> y camionetas 4x4 con estándar minero.
            </p>

            {/* Pillar Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-200">
                  <strong>100% Gasto OpEx:</strong> Cuota 100% deducible de impuestos (Art. 31 LIR). Libera capital de trabajo.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-200">
                  <strong>Equipamiento a Medida:</strong> Equipos de frío, rampas hidráulicas, grúas pluma o kit minero DS 132.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-200">
                  <strong>Vehículo de Reemplazo:</strong> Continuidad operativa asegurada en menos de 24 horas a nivel nacional.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-200">
                  <strong>Telemetría & GPS:</strong> Monitoreo de rutas, kilometraje, control de puertas y mantenimiento incluido.
                </span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                type="button"
                onClick={onExploreFleet}
                className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 group"
              >
                <span>Explorar Catálogo de Flota</span>
                <ChevronRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#sectores"
                className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm rounded-xl border border-slate-700 transition-colors flex items-center gap-2"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Soluciones por Sector Industrial</span>
              </a>
            </div>

            {/* Brand Trust Strip */}
            <div className="pt-6 border-t border-slate-800/80">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Sectores atendidos a lo largo de todo Chile:
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-bold text-slate-400">
                <span className="text-slate-300 hover:text-white transition-colors">LOGÍSTICA & E-COMMERCE</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300 hover:text-white transition-colors">DISTRIBUCIÓN DE ALIMENTOS</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300 hover:text-white transition-colors">FLETES & CARGA PESADA</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300 hover:text-white transition-colors">GRÚAS & RESCATE</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300 hover:text-white transition-colors">CONSTRUCCIÓN & MINERÍA</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Quick Quote Widget */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-6 sm:p-7 shadow-2xl shadow-black/40 relative">
              
              {/* Corner Tag */}
              <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
                Cotización Rápida B2B
              </div>

              <div className="mb-5">
                <h3 className="text-xl font-bold font-heading text-white">
                  Cotizador Inmediato de Flotas
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Obtén una propuesta técnico-económica para tu empresa en minutos
                </p>
              </div>

              <form onSubmit={handleQuickSubmit} className="space-y-4">
                
                {/* Vehicle Type Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    1. Tipo de Vehículo Requerido
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedCategory('furgones')}
                      className={`p-2.5 text-xs font-bold rounded-xl border text-left transition-all flex items-center gap-2 ${
                        selectedCategory === 'furgones'
                          ? 'bg-amber-500/10 border-amber-500 text-amber-300 shadow-sm'
                          : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                      <div>
                        <div>Furgones Carga/Frío</div>
                        <div className="text-[10px] font-normal text-slate-400">Courier & Panaderías</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedCategory('camiones')}
                      className={`p-2.5 text-xs font-bold rounded-xl border text-left transition-all flex items-center gap-2 ${
                        selectedCategory === 'camiones'
                          ? 'bg-amber-500/10 border-amber-500 text-amber-300 shadow-sm'
                          : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                      <div>
                        <div>Camiones & Grúas</div>
                        <div className="text-[10px] font-normal text-slate-400">Fletes 60 m³ / Grúa Pluma</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedCategory('pickups')}
                      className={`p-2.5 text-xs font-bold rounded-xl border text-left transition-all flex items-center gap-2 ${
                        selectedCategory === 'pickups'
                          ? 'bg-amber-500/10 border-amber-500 text-amber-300 shadow-sm'
                          : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                      <div>
                        <div>Camionetas 4x4</div>
                        <div className="text-[10px] font-normal text-slate-400">Comercial & Minera</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedCategory('minibuses')}
                      className={`p-2.5 text-xs font-bold rounded-xl border text-left transition-all flex items-center gap-2 ${
                        selectedCategory === 'minibuses'
                          ? 'bg-amber-500/10 border-amber-500 text-amber-300 shadow-sm'
                          : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                      <div>
                        <div>Minibús Pasajeros</div>
                        <div className="text-[10px] font-normal text-slate-400">12 a 20 PAX</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Region Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    2. Región Principal de Operación
                  </label>
                  <div className="relative">
                    <select
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 appearance-none font-medium"
                    >
                      {REGIONS_AND_FAENAS.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name} (SLA &lt; {r.slaHours}h)
                        </option>
                      ))}
                    </select>
                    <MapPin className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                  </div>
                </div>

                {/* Term & Quantity Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      3. Plazo Contrato
                    </label>
                    <select
                      value={selectedTerm}
                      onChange={(e) => setSelectedTerm(Number(e.target.value))}
                      className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-amber-500"
                    >
                      <option value={3}>1 a 3 meses (Spot / Proyecto)</option>
                      <option value={6}>6 meses (Semestral)</option>
                      <option value={12}>12 meses (Anual)</option>
                      <option value={24}>24 meses (Largo Plazo)</option>
                      <option value={36}>36 meses (Flota Dedicada)</option>
                      <option value={48}>48 meses (Full Renting)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      4. Cantidad Unidades
                    </label>
                    <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 text-slate-300 hover:text-white font-bold text-sm"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min={1}
                        max={150}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full text-center bg-transparent text-white font-bold text-sm py-2 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-2 text-slate-300 hover:text-white font-bold text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Estimate Preview */}
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Cuota mensual estimada:</span>
                    <span className="text-xs font-medium text-amber-400">
                      Incluye Seguro, GPS, Mantención y Reemplazo
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-base sm:text-lg font-bold font-mono text-white">
                      {formatCurrency(
                        (selectedCategory === 'furgones' ? 24.0 : selectedCategory === 'camiones' ? 68.0 : selectedCategory === 'pickups' ? 28.5 : 52.0) * quantity,
                        currency
                      )}
                    </span>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Continuar y Cotizar Flota Completa</span>
                  <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Propuesta formal con dossier técnico en menos de 2 horas</span>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Trust Metrics Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="text-2xl font-black font-heading text-white">2.400+</div>
              <div className="text-xs text-slate-400 font-medium">Unidades activas en Chile</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="text-2xl font-black font-heading text-white">&lt; 24h</div>
              <div className="text-xs text-slate-400 font-medium">Reemplazo garantizado en ruta</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="text-2xl font-black font-heading text-white">100% OpEx</div>
              <div className="text-xs text-slate-400 font-medium">Gasto 100% deducible SII</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="text-2xl font-black font-heading text-white">Arica a Chiloé</div>
              <div className="text-xs text-slate-400 font-medium">Cobertura técnica nacional</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

