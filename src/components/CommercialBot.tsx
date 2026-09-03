import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send, MessageSquare, Bot } from 'lucide-react';

const WHATSAPP_NUMBER = '56973888336';

interface BotMessage {
  id: string;
  from: 'bot' | 'user';
  text: string;
}

interface Intent {
  keywords: string[];
  response: string;
  scrollTo?: string;
}

const INTENTS: Intent[] = [
  {
    keywords: ['flota', 'vehiculo', 'camion', 'furgon', 'camioneta', 'grua', 'catalogo', 'modelo'],
    response: 'Tenemos furgones de courier, unidades refrigeradas, camiones de flete, camiones pluma y camionetas 4x4. Te llevo al catálogo completo.',
    scrollTo: 'flota',
  },
  {
    keywords: ['cotiz', 'precio', 'valor', 'presupuesto', 'cuanto cuesta', 'arriendo', 'mensual'],
    response: 'Puedo llevarte directo al cotizador: eliges vehículos, plazo y región, y te calcula la cuota mensual en UF o CLP al instante.',
    scrollTo: 'cotizar',
  },
  {
    keywords: ['opex', 'ahorro', 'impuesto', 'tributari', 'iva', 'descuento', 'capex', 'deducible'],
    response: 'Nuestra calculadora financiera compara Renting (OpEx) vs. Compra/Leasing (CapEx) y estima tu escudo tributario. Te llevo a ella.',
    scrollTo: 'calculadora-opex',
  },
  {
    keywords: ['cobertura', 'region', 'ubicacion', 'base', 'zona', 'faena', 'donde'],
    response: 'Tenemos bases operacionales de Antofagasta a Rancagua con SLA de asistencia en ruta. Te muestro el mapa de cobertura.',
    scrollTo: 'cobertura',
  },
  {
    keywords: ['sernageomin', 'norma', 'ds132', 'ds 132', 'mineria', 'certificacion', 'homologacion'],
    response: 'Toda nuestra flota minera cumple el Estándar SERNAGEOMIN DS 132. Te muestro el detalle de equipamiento y homologaciones.',
    scrollTo: 'estandar-minero',
  },
];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

function matchIntent(rawText: string): Intent | null {
  const text = normalize(rawText);
  return INTENTS.find((intent) => intent.keywords.some((kw) => text.includes(kw))) ?? null;
}

const MAX_FAILED_ATTEMPTS = 2;

export const CommercialBot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [escalate, setEscalate] = useState(false);
  const [messages, setMessages] = useState<BotMessage[]>([
    {
      id: 'greet',
      from: 'bot',
      text: 'Hola, soy el asistente comercial de WORKUP. Cuéntame qué necesitas o elige una opción abajo.',
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, escalate]);

  const whatsappLink = (context: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      `Hola WORKUP, vengo del asistente web y necesito ayuda con: ${context}`
    )}`;

  const addMessage = (msg: Omit<BotMessage, 'id'>) => {
    setMessages((prev) => [...prev, { ...msg, id: `${Date.now()}-${prev.length}` }]);
  };

  const goToSection = (sectionId: string) => {
    setOpen(false);
    window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  const handleIntentReply = (userText: string) => {
    addMessage({ from: 'user', text: userText });

    const intent = matchIntent(userText);

    if (intent) {
      setFailedAttempts(0);
      addMessage({ from: 'bot', text: intent.response });
      if (intent.scrollTo) {
        const target = intent.scrollTo;
        window.setTimeout(() => goToSection(target), 500);
      }
      return;
    }

    const nextFailed = failedAttempts + 1;
    setFailedAttempts(nextFailed);

    if (nextFailed >= MAX_FAILED_ATTEMPTS) {
      setEscalate(true);
      addMessage({
        from: 'bot',
        text: 'No logro identificar bien tu consulta. Mejor te conecto directo con un ejecutivo comercial por WhatsApp para resolverlo altiro.',
      });
    } else {
      addMessage({
        from: 'bot',
        text: 'No estoy seguro de haber entendido. Puedes preguntarme por flota, cotizaciones, ahorro tributario, cobertura o normativa SERNAGEOMIN.',
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput('');
    handleIntentReply(text);
  };

  const handleQuickReply = (intent: Intent) => {
    addMessage({ from: 'user', text: intent.keywords[0] });
    setFailedAttempts(0);
    addMessage({ from: 'bot', text: intent.response });
    if (intent.scrollTo) {
      const target = intent.scrollTo;
      window.setTimeout(() => goToSection(target), 500);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-2xl shadow-amber-500/30 flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        aria-label={open ? 'Cerrar asistente comercial' : 'Abrir asistente comercial'}
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[calc(100vw-2.5rem)] max-w-sm bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[70vh]">
          {/* Header */}
          <div className="bg-slate-950 border-b border-slate-800 px-4 py-3 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-500/15 border border-amber-500/40 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Asistente Comercial WORKUP</div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                En línea
              </div>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-3.5 py-3 space-y-2.5 min-h-[200px]">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                    m.from === 'user'
                      ? 'bg-amber-500 text-slate-950 font-semibold rounded-br-sm'
                      : 'bg-slate-800 text-slate-200 rounded-bl-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {escalate && (
              <a
                href={whatsappLink('necesito hablar con un ejecutivo comercial')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 mt-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Hablar con Ejecutivo por WhatsApp</span>
              </a>
            )}
          </div>

          {/* Quick Replies */}
          <div className="px-3.5 pb-2 flex flex-wrap gap-1.5 border-t border-slate-800 pt-2.5">
            {INTENTS.map((intent) => (
              <button
                key={intent.scrollTo}
                type="button"
                onClick={() => handleQuickReply(intent)}
                className="text-[10px] font-semibold px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full border border-slate-700 transition-colors"
              >
                {intent.scrollTo === 'flota' && 'Ver Flota'}
                {intent.scrollTo === 'cotizar' && 'Cotizar'}
                {intent.scrollTo === 'calculadora-opex' && 'Ahorro Tributario'}
                {intent.scrollTo === 'cobertura' && 'Cobertura'}
                {intent.scrollTo === 'estandar-minero' && 'Norma SERNAGEOMIN'}
              </button>
            ))}
            <a
              href={whatsappLink('quiero hablar directo con un ejecutivo comercial')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-bold px-2.5 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 rounded-full border border-emerald-600/40 transition-colors flex items-center gap-1"
            >
              <MessageSquare className="w-3 h-3" />
              Ejecutivo
            </a>
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-2.5 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu consulta..."
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
            <button
              type="submit"
              className="w-9 h-9 shrink-0 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl flex items-center justify-center transition-colors"
              aria-label="Enviar"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
