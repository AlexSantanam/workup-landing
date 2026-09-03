import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
  holdMs?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish, holdMs = 4000 }) => {
  const [visible, setVisible] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Trigger the entrance transition on the next frame
    const enterFrame = requestAnimationFrame(() => setVisible(true));

    const holdTimer = window.setTimeout(() => setFadingOut(true), holdMs);
    const finishTimer = window.setTimeout(() => {
      document.body.style.overflow = '';
      onFinish();
    }, holdMs + 500);

    return () => {
      cancelAnimationFrame(enterFrame);
      window.clearTimeout(holdTimer);
      window.clearTimeout(finishTimer);
      document.body.style.overflow = '';
    };
  }, [holdMs, onFinish]);

  const handleSkip = () => {
    setFadingOut(true);
    window.setTimeout(() => {
      document.body.style.overflow = '';
      onFinish();
    }, 400);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center transition-opacity duration-500 ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <img
        src="/workup.png"
        alt="WORKUP Industrial Vehicle Rental"
        className={`w-[70vw] max-w-xl transition-all duration-700 ease-out ${
          visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      />
      <div
        className={`mt-6 flex items-center gap-2 text-xs text-slate-500 uppercase tracking-widest transition-opacity duration-700 delay-200 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        <span>Renting Operativo de Flotas Comerciales</span>
      </div>

      <button
        type="button"
        onClick={handleSkip}
        className="absolute bottom-6 right-6 text-[11px] font-semibold text-slate-500 hover:text-slate-300 transition-colors underline underline-offset-2"
      >
        Saltar
      </button>
    </div>
  );
};
