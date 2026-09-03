import React, { useState } from 'react';
import { 
  ShieldCheck, 
  PhoneCall, 
  Clock, 
  Truck, 
  Calculator, 
  MapPin, 
  FileText, 
  Menu, 
  X, 
  ArrowRight,
  BadgeCheck,
  Building2,
  ChevronDown
} from 'lucide-react';
import { CURRENT_UF_VALUE_CLP, formatCLP } from '../utils/currency';
import { WorkupLogo } from './WorkupLogo';

interface NavbarProps {
  currency: 'UF' | 'CLP';
  onToggleCurrency: (currency: 'UF' | 'CLP') => void;
  selectedVehicleCount: number;
  onOpenQuoteBuilder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currency,
  onToggleCurrency,
  selectedVehicleCount,
  onOpenQuoteBuilder,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white">
      {/* Top Corporate Bar */}
      <div className="bg-slate-900 border-b border-slate-800/80 text-xs py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-4 text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-white">Bases Operacionales 24/7:</span>
              <span className="hidden sm:inline text-slate-400">Antofagasta • Calama • Iquique • Copiapó • Santiago • Rancagua</span>
              <span className="sm:hidden text-slate-400">Norte & Centro</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 pl-3 border-l border-slate-700 text-amber-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Estándar SERNAGEOMIN DS 132</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-slate-300">
            <div className="flex items-center gap-1 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60">
              <span className="text-slate-400">UF Hoy (SII):</span>
              <span className="font-mono font-bold text-amber-400">{formatCLP(CURRENT_UF_VALUE_CLP)}</span>
            </div>
            <a 
              href="tel:+56228994000" 
              className="hidden md:flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold">Mesa Ayuda: 600 400 9000</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <WorkupLogo variant="compact" markHeight={38} theme="dark" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <a 
              href="#flota" 
              className="px-3.5 py-2 text-sm font-semibold text-slate-200 hover:text-amber-400 hover:bg-slate-900 rounded-lg transition-colors"
            >
              Catálogo de Flota
            </a>
            <a 
              href="#sectores" 
              className="px-3.5 py-2 text-sm font-semibold text-slate-200 hover:text-amber-400 hover:bg-slate-900 rounded-lg transition-colors"
            >
              Sectores & Industrias
            </a>
            <a 
              href="#estandar-minero" 
              className="px-3.5 py-2 text-sm font-semibold text-slate-200 hover:text-amber-400 hover:bg-slate-900 rounded-lg transition-colors flex items-center gap-1"
            >
              <span>Equipamiento Técnico</span>
              <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-1 rounded">A Medida</span>
            </a>
            <a 
              href="#calculadora-opex" 
              className="px-3.5 py-2 text-sm font-semibold text-slate-200 hover:text-amber-400 hover:bg-slate-900 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Calculator className="w-4 h-4 text-slate-400" />
              <span>Calculadora OpEx</span>
            </a>
            <a 
              href="#cobertura" 
              className="px-3.5 py-2 text-sm font-semibold text-slate-200 hover:text-amber-400 hover:bg-slate-900 rounded-lg transition-colors"
            >
              Cobertura Nacional
            </a>
          </nav>

          {/* Right Action Area */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Currency Switcher */}
            <div className="flex items-center bg-slate-900 rounded-lg p-1 border border-slate-800">
              <button
                type="button"
                onClick={() => onToggleCurrency('UF')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                  currency === 'UF'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Mostrar tarifas en Unidades de Fomento (UF)"
              >
                UF
              </button>
              <button
                type="button"
                onClick={() => onToggleCurrency('CLP')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                  currency === 'CLP'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Mostrar tarifas en Pesos Chilenos (CLP)"
              >
                CLP
              </button>
            </div>

            {/* Quote CTA Button */}
            <button
              type="button"
              onClick={onOpenQuoteBuilder}
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <FileText className="w-4 h-4 text-slate-950" />
              <span>Cotizar Flota Empresa</span>
              {selectedVehicleCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 text-xs font-black bg-slate-950 text-amber-400 rounded-full">
                  {selectedVehicleCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden space-x-2">
            <button
              type="button"
              onClick={onOpenQuoteBuilder}
              className="p-2 bg-amber-500 text-slate-950 rounded-lg font-bold text-xs flex items-center gap-1"
            >
              <FileText className="w-4 h-4" />
              <span>{selectedVehicleCount > 0 ? `(${selectedVehicleCount})` : 'Cotizar'}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs text-slate-400 font-medium">Moneda de visualización:</span>
            <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800">
              <button
                type="button"
                onClick={() => onToggleCurrency('UF')}
                className={`px-3 py-1 text-xs font-bold rounded ${
                  currency === 'UF' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                UF
              </button>
              <button
                type="button"
                onClick={() => onToggleCurrency('CLP')}
                className={`px-3 py-1 text-xs font-bold rounded ${
                  currency === 'CLP' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                CLP
              </button>
            </div>
          </div>

          <nav className="flex flex-col space-y-2">
            <a
              href="#flota"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-semibold text-slate-200 hover:bg-slate-900 rounded-lg"
            >
              Catálogo de Flota Minera
            </a>
            <a
              href="#estandar-minero"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-semibold text-slate-200 hover:bg-slate-900 rounded-lg flex items-center justify-between"
            >
              <span>Estándar SERNAGEOMIN DS 132</span>
              <span className="text-xs bg-amber-400 text-slate-950 font-bold px-1.5 py-0.5 rounded">Norma</span>
            </a>
            <a
              href="#calculadora-opex"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-semibold text-slate-200 hover:bg-slate-900 rounded-lg"
            >
              Calculadora OpEx (Escudo Tributario)
            </a>
            <a
              href="#cobertura"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-semibold text-slate-200 hover:bg-slate-900 rounded-lg"
            >
              Bases Operacionales & Faenas
            </a>
            <a
              href="#soporte"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-semibold text-slate-200 hover:bg-slate-900 rounded-lg"
            >
              Soporte Técnico 24/7
            </a>
          </nav>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteBuilder();
              }}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Cotizar Flota Empresa</span>
            </button>
            <a
              href="tel:+56228994000"
              className="w-full py-2.5 bg-slate-900 text-slate-300 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 border border-slate-800"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>Mesa Ayuda Directa: 600 400 9000</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
