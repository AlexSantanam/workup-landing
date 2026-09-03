import React from 'react';
import { 
  Truck, 
  ShieldCheck, 
  PhoneCall, 
  Mail, 
  MapPin, 
  Clock, 
  FileText, 
  Award, 
  Building2,
  Lock,
  Package,
  Anchor,
  ThermometerSnowflake
} from 'lucide-react';
import { CURRENT_UF_VALUE_CLP, formatCLP } from '../utils/currency';
import { WorkupLogo } from './WorkupLogo';

export const Footer: React.FC = () => {
  return (
    <footer id="contacto" className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      
      {/* Upper Footer CTA Strip */}
      <div className="bg-slate-900 border-b border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-slate-950 shrink-0">
              <Truck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-base font-bold font-heading text-white">
                ¿Licitando o expandiendo tus rutas logísticas e industriales?
              </h4>
              <p className="text-xs text-slate-400">
                Respaldo de flota con carta de compromiso para adjuntar a tu propuesta técnica de licitación o contrato comercial.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#cotizar"
              className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition-all"
            >
              Solicitar Carta de Compromiso
            </a>
            <a
              href="tel:+56228994000"
              className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-colors flex items-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>Central B2B: +56 2 2899 4000</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand & Legal ID (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <WorkupLogo variant="full" markHeight={40} theme="dark" />

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Empresa chilena líder en Renting Operativo de flotas comerciales: furgones para paquetería y courier, vehículos refrigerados para alimentos, camiones de flete de gran volumen, servicio de grúa pluma y camionetas 4x4 técnicas.
            </p>

            <div className="space-y-1 text-[11px] text-slate-400 font-mono">
              <div><strong className="text-slate-300">Razón Social:</strong> WORKUP Renting Operativo SpA</div>
              <div><strong className="text-slate-300">RUT:</strong> 76.842.190-3 (Giro Comercial Vehicular & Logístico B2B)</div>
              <div><strong className="text-slate-300">Valor UF Referencial:</strong> {formatCLP(CURRENT_UF_VALUE_CLP)}</div>
            </div>

            {/* Certifications Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="bg-slate-900 border border-slate-800 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded">
                ISO 9001:2015
              </span>
              <span className="bg-slate-900 border border-slate-800 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded">
                ISO 14001:2015
              </span>
              <span className="bg-slate-900 border border-slate-800 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded">
                HACCP Cadena de Frío
              </span>
              <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded">
                SERNAGEOMIN DS 132
              </span>
            </div>
          </div>

          {/* Col 2: Catálogo & Servicios */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">
              Flota B2B & Servicios
            </h5>
            <ul className="space-y-2">
              <li><a href="#flota" className="hover:text-amber-400 transition-colors">Furgones Courier & E-Commerce</a></li>
              <li><a href="#flota" className="hover:text-amber-400 transition-colors">Unidades Refrigeradas (Frío -18°C)</a></li>
              <li><a href="#flota" className="hover:text-amber-400 transition-colors">Camiones de Flete & Gran Volumen</a></li>
              <li><a href="#flota" className="hover:text-amber-400 transition-colors">Camiones con Grúa Pluma Hidráulica</a></li>
              <li><a href="#flota" className="hover:text-amber-400 transition-colors">Camionetas 4x4 Corporativas</a></li>
              <li><a href="#estandares" className="hover:text-amber-400 transition-colors">Telemetría GPS & Control de Carga</a></li>
            </ul>
          </div>

          {/* Col 3: Bases Operacionales */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">
              Bases & Cobertura en Chile
            </h5>
            <ul className="space-y-2">
              <li><span className="text-slate-300 font-semibold">Casa Matriz:</span> Santiago (Pudahuel / Enea)</li>
              <li><span className="text-slate-300 font-semibold">Base Centro:</span> Valparaíso & San Antonio</li>
              <li><span className="text-slate-300 font-semibold">Base Sur:</span> Concepción & Biobío</li>
              <li><span className="text-slate-300 font-semibold">Base Lagos:</span> Puerto Montt & Osorno</li>
              <li><span className="text-slate-300 font-semibold">Base Norte Grande:</span> Antofagasta & Calama</li>
              <li><span className="text-slate-300 font-semibold">Base Norte Chico:</span> Coquimbo & La Serena</li>
            </ul>
          </div>

          {/* Col 4: Mesa de Ayuda 24/7 */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">
              Contacto & Asistencia
            </h5>
            <div className="space-y-2.5">
              <div>
                <span className="text-[11px] text-slate-400 block">Mesa de Ayuda en Ruta 24/7:</span>
                <a href="tel:6004009000" className="text-amber-400 font-mono font-bold hover:underline">
                  600 400 9000
                </a>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block">Contacto Comercial B2B:</span>
                <a href="mailto:cotizaciones@workup.cl" className="text-white font-medium hover:text-amber-400">
                  cotizaciones@workup.cl
                </a>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block">WhatsApp Asignación Flotas:</span>
                <a href="https://wa.me/56973888336" target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-mono font-semibold hover:underline">
                  +56 9 7388 8336
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 WORKUP SpA. Todos los derechos reservados. Renting Operativo de Vehículos Corporativos, Camiones y Flotas Comerciales en Chile.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Términos de Renting</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Estándar de Seguridad & Carga</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Política de Privacidad</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
