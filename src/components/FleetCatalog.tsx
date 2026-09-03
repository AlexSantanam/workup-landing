import React, { useState, useMemo } from 'react';
import { 
  Truck, 
  ShieldCheck, 
  Users, 
  Scale, 
  Fuel, 
  Search, 
  SlidersHorizontal, 
  FileText, 
  CheckCircle2, 
  Plus, 
  Eye, 
  Zap, 
  ChevronRight,
  Info,
  Layers,
  Sparkles,
  ThermometerSnowflake,
  Wrench,
  Navigation
} from 'lucide-react';
import { Vehicle, VehicleCategory, IndustrySector } from '../types';
import { FLEET_VEHICLES } from '../data/fleetData';
import { formatCurrency } from '../utils/currency';

interface FleetCatalogProps {
  currency: 'UF' | 'CLP';
  onSelectVehicleForModal: (vehicle: Vehicle) => void;
  onAddToQuote: (vehicle: Vehicle) => void;
  selectedVehicleIds: string[];
}

export const FleetCatalog: React.FC<FleetCatalogProps> = ({
  currency,
  onSelectVehicleForModal,
  onAddToQuote,
  selectedVehicleIds,
}) => {
  const [activeCategory, setActiveCategory] = useState<VehicleCategory>('all');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVehicles = useMemo(() => {
    return FLEET_VEHICLES.filter((vehicle) => {
      // Category filter
      if (activeCategory !== 'all' && vehicle.category !== activeCategory) {
        return false;
      }
      // Industry sector filter
      if (selectedSector !== 'all') {
        const hasSector = vehicle.targetSectors?.includes(selectedSector as IndustrySector);
        if (!hasSector) return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchModel = vehicle.model.toLowerCase().includes(query);
        const matchBrand = vehicle.brand.toLowerCase().includes(query);
        const matchCategory = vehicle.categoryLabel.toLowerCase().includes(query);
        const matchSpecs = vehicle.cargoVolumeM3 ? `${vehicle.cargoVolumeM3}m3`.includes(query) : false;
        const matchTags = vehicle.industryTags?.some(t => t.toLowerCase().includes(query));
        if (!matchModel && !matchBrand && !matchCategory && !matchSpecs && !matchTags) return false;
      }
      return true;
    });
  }, [activeCategory, selectedSector, searchQuery]);

  return (
    <section id="flota" className="py-16 lg:py-24 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Truck className="w-3.5 h-3.5" />
              <span>Catálogo Integral de Flotas Comerciales & Industriales</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white">
              Furgones, Camiones, Grúas y Flotas Corporativas
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Equipamiento técnico a medida: furgones para courier o frío para panaderías, camiones para fletes de gran volumen, servicio de grúas y camionetas 4x4 mineras con mantenimiento preventivo incluido.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800 text-xs text-slate-300">
            <span className="font-semibold text-slate-400">Total unidades configuradas:</span>
            <span className="font-mono font-bold text-amber-400">{FLEET_VEHICLES.length} Modelos Disponibles</span>
          </div>
        </div>

        {/* Category Tabs & Search Filter Bar */}
        <div className="space-y-4 mb-10">
          
          {/* Main Category Tabs */}
          <div className="flex overflow-x-auto pb-2 scrollbar-none gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeCategory === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <span>Todos los Vehículos</span>
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-slate-950/30">
                {FLEET_VEHICLES.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory('furgones')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeCategory === 'furgones'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <span>Furgones Courier & Panaderías</span>
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-slate-950/30">4</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory('camiones')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeCategory === 'camiones'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <span>Camiones de Gran Volumen & Grúas</span>
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-slate-950/30">3</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory('pickups')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeCategory === 'pickups'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <span>Camionetas 4x4 Estándar Minero</span>
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-slate-950/30">2</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory('minibuses')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeCategory === 'minibuses'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <span>Minibuses & Pasajeros (12-20 PAX)</span>
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-slate-950/30">1</span>
            </button>
          </div>

          {/* Search & Sector Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-7 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por modelo, furgón Blue Express, panadería, grúa pluma, camión 60m³..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="sm:col-span-5 relative">
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none font-medium"
              >
                <option value="all">Filtrar por Rubro / Industria (Todos)</option>
                <option value="logistica_courier">Logística, Courier & E-Commerce</option>
                <option value="alimentos_panaderias">Alimentos, Panaderías & Cadena de Frío</option>
                <option value="fletes_volumen">Fletes & Traslado de Gran Volumen</option>
                <option value="camiones_gruas">Servicios de Grúa & Rescate Vehicular</option>
                <option value="mineria_energia">Minería & Faenas (DS 132)</option>
                <option value="construccion_obras">Construcción & Obras</option>
                <option value="transporte_personal">Transporte de Personal</option>
              </select>
              <SlidersHorizontal className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Vehicle Cards Grid */}
        {filteredVehicles.length === 0 ? (
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 space-y-3">
            <Truck className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No se encontraron vehículos para el criterio</h3>
            <p className="text-xs text-slate-400">Intenta modificando los filtros de rubro o la búsqueda.</p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setSelectedSector('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredVehicles.map((vehicle) => {
              const isSelectedInQuote = selectedVehicleIds.includes(vehicle.id);

              return (
                <div
                  key={vehicle.id}
                  className="bg-slate-950/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-slate-700 transition-all flex flex-col group"
                >
                  
                  {/* Card Image Area with Badges */}
                  <div className="relative h-52 bg-slate-900 overflow-hidden">
                    <img
                      src={vehicle.image}
                      alt={vehicle.model}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[85%]">
                      {vehicle.cargoVolumeM3 && (
                        <span className="bg-blue-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-md">
                          {vehicle.cargoVolumeM3} m³ Carga
                        </span>
                      )}
                      {vehicle.refrigeratedOption && (
                        <span className="bg-cyan-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
                          <ThermometerSnowflake className="w-3 h-3" />
                          <span>-5°C a +15°C Frío</span>
                        </span>
                      )}
                      {vehicle.craneCapacityTon && (
                        <span className="bg-amber-500 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
                          <Wrench className="w-3 h-3" />
                          <span>Grúa {vehicle.craneCapacityTon} T/m</span>
                        </span>
                      )}
                      {vehicle.category === 'pickups' && (
                        <span className="bg-amber-500 text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          <span>DS 132 Minero</span>
                        </span>
                      )}
                      {vehicle.immediateDelivery && (
                        <span className="bg-emerald-600 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-full shadow-md">
                          Entrega Inmediata
                        </span>
                      )}
                    </div>

                    {/* Traction Badge Bottom */}
                    <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-sm border border-slate-700/80 px-2.5 py-1 rounded-lg text-[11px] font-bold text-amber-400">
                      {vehicle.traction}
                    </div>

                    {/* Suitability Badge */}
                    <div className="absolute bottom-3 right-3 text-[10px] font-bold text-slate-300 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
                      {vehicle.targetSectors?.includes('alimentos_panaderias') 
                        ? 'Panadería & Alimentos' 
                        : vehicle.targetSectors?.includes('camiones_gruas')
                        ? 'Servicio Grúa / Rescate'
                        : vehicle.targetSectors?.includes('fletes_volumen')
                        ? 'Fletes Gran Volumen'
                        : vehicle.targetSectors?.includes('logistica_courier')
                        ? 'Courier & Logística'
                        : 'Estándar Minero'}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    
                    <div>
                      {/* Category Label */}
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        {vehicle.brand} • {vehicle.categoryLabel}
                      </span>

                      {/* Model Name */}
                      <h3 className="text-base sm:text-lg font-bold font-heading text-white line-clamp-1 group-hover:text-amber-400 transition-colors">
                        {vehicle.model}
                      </h3>

                      {/* Engine & Power */}
                      <p className="text-xs text-slate-400 mt-1 line-clamp-1 font-mono">
                        {vehicle.engine}
                      </p>
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800/80 text-center">
                      <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                        {vehicle.cargoVolumeM3 ? (
                          <>
                            <Truck className="w-3.5 h-3.5 text-amber-400 mx-auto mb-1" />
                            <span className="text-[11px] font-bold text-white block">{vehicle.cargoVolumeM3} m³</span>
                            <span className="text-[9px] text-slate-400">Volumen</span>
                          </>
                        ) : vehicle.craneCapacityTon ? (
                          <>
                            <Wrench className="w-3.5 h-3.5 text-amber-400 mx-auto mb-1" />
                            <span className="text-[11px] font-bold text-white block">{vehicle.craneCapacityTon} T/m</span>
                            <span className="text-[9px] text-slate-400">Grúa Pluma</span>
                          </>
                        ) : (
                          <>
                            <Users className="w-3.5 h-3.5 text-amber-400 mx-auto mb-1" />
                            <span className="text-[11px] font-bold text-white block">{vehicle.seats} PAX</span>
                            <span className="text-[9px] text-slate-400">Pasajeros</span>
                          </>
                        )}
                      </div>

                      <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                        <Scale className="w-3.5 h-3.5 text-amber-400 mx-auto mb-1" />
                        <span className="text-[11px] font-bold text-white block">{vehicle.payloadKg.toLocaleString('es-CL')} kg</span>
                        <span className="text-[9px] text-slate-400">Carga útil</span>
                      </div>

                      <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                        <Fuel className="w-3.5 h-3.5 text-amber-400 mx-auto mb-1" />
                        <span className="text-[11px] font-bold text-white block">Diésel Euro 6</span>
                        <span className="text-[9px] text-slate-400">Eficiencia</span>
                      </div>
                    </div>

                    {/* Equipment Snippet */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Equipamiento Configurado:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {vehicle.equipmentList.slice(0, 4).map((eq, idx) => (
                          <span key={idx} className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800 truncate max-w-[150px]">
                            {typeof eq === 'string' ? eq : eq?.name || 'Equipamiento B2B'}
                          </span>
                        ))}
                        {vehicle.equipmentList.length > 4 && (
                          <span className="text-[10px] bg-slate-800 text-amber-400 px-1.5 py-0.5 rounded font-bold">
                            +{vehicle.equipmentList.length - 4} más
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price & Action Buttons */}
                    <div className="pt-3 border-t border-slate-800/80 space-y-3">
                      
                      {/* Price Strip */}
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-bold">
                            Cuota Renting Mensual
                          </span>
                          <span className="text-lg font-extrabold font-mono text-amber-400">
                            {formatCurrency(vehicle.monthlyUF, currency)}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                          100% OpEx SII
                        </span>
                      </div>

                      {/* Interactive Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => onSelectVehicleForModal(vehicle)}
                          className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5 text-amber-400" />
                          <span>Ficha Técnica</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onAddToQuote(vehicle)}
                          className={`py-2.5 px-3 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                            isSelectedInQuote
                              ? 'bg-emerald-500 text-slate-950'
                              : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                          }`}
                        >
                          {isSelectedInQuote ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>En Cotización</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Cotizar Unidad</span>
                            </>
                          )}
                        </button>
                      </div>

                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
