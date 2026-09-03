import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Building2, 
  Quote, 
  CheckCircle2, 
  Star,
  Users,
  Flame,
  Truck,
  Package,
  ThermometerSnowflake,
  Anchor
} from 'lucide-react';

export const TestimonialsAndClients: React.FC = () => {
  const testimonials = [
    {
      quote: "Operamos como flota aliada para empresas de courier como Blue Express en la Región Metropolitana. WORKUP nos entregó 12 furgones Boxer equipados con telemetría de ruta y reemplazo inmediato, permitiéndonos cumplir el SLA de entrega diaria al 100%.",
      author: "Rodrigo San Martín",
      role: "Gerente de Flota & Distribución",
      company: "Logística Express & Encomiendas SpA",
      operation: "Distribución Courier & E-Commerce (RM)",
      rating: 5,
    },
    {
      quote: "Para nuestra red de panaderías y pastelerías en Concepción y Chillán, el control de temperatura es crítico. Los furgones refrigerados con equipo Thermo King a -18°C operan sin fallas y la cuota mensual es 100% deducible de impuestos (OpEx).",
      author: "Camila Fuentes",
      role: "Jefa de Abastecimiento & Cadena de Frío",
      company: "Distribuidora de Alimentos del Sur",
      operation: "Rutas de Distribución Alimentaria (VIII Región)",
      rating: 5,
    },
    {
      quote: "Arrendamos camiones con grúa pluma Hiab de 14 Tn/m para montajes industriales y fletes de gran tonelaje entre Santiago y Puerto Montt. El soporte técnico y la certificación vigente de los equipos nos abrieron contratos con grandes mandantes.",
      author: "Mauricio Tapia",
      role: "Director de Operaciones & Maquinaria",
      company: "Montajes & Grúas Industriales Chile",
      operation: "Transporte Pesado & Izaje Interurbano",
      rating: 5,
    },
  ];

  return (
    <section id="soporte" className="py-16 lg:py-24 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-4 h-4" />
            <span>Casos de Éxito & Testimonios B2B</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white">
            La Confianza de Empresas de Logística, Distribución e Industria en Chile
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Respaldamos a operadores de paquetería express, cadenas de alimentos, empresas de fletes pesados y contratistas mineros con flotas de alta disponibilidad.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all shadow-xl"
            >
              <div className="space-y-3">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-slate-700" />

                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-1">
                <div className="text-xs font-bold text-white">{t.author}</div>
                <div className="text-[11px] text-amber-400 font-medium">{t.role}</div>
                <div className="text-[11px] text-slate-400">{t.company}</div>
                <div className="text-[10px] text-emerald-400 font-semibold pt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{t.operation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certified Quality Indicators */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-black font-heading text-amber-400">99.6%</div>
              <div className="text-xs text-slate-300 font-semibold mt-1">Disponibilidad de Flota</div>
              <div className="text-[11px] text-slate-500">Uptime operativo continuo</div>
            </div>

            <div>
              <div className="text-3xl font-black font-heading text-white">0%</div>
              <div className="text-xs text-slate-300 font-semibold mt-1">Paralización de Rutas</div>
              <div className="text-[11px] text-slate-500">Unidades de reemplazo activas</div>
            </div>

            <div>
              <div className="text-3xl font-black font-heading text-amber-400">&lt; 4h</div>
              <div className="text-xs text-slate-300 font-semibold mt-1">SLA Asistencia Urbana</div>
              <div className="text-[11px] text-slate-500">Santiago, V y VIII Región</div>
            </div>

            <div>
              <div className="text-3xl font-black font-heading text-white">100%</div>
              <div className="text-xs text-slate-300 font-semibold mt-1">Telemetría GPS & Sensores</div>
              <div className="text-[11px] text-slate-500">Rutas, frío y peso en tiempo real</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
