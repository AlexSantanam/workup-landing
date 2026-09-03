import React from 'react';

interface WorkupLogoProps {
  variant?: 'full' | 'compact' | 'mark';
  theme?: 'dark' | 'light';
  className?: string;
  markHeight?: number | string;
  showSubtitle?: boolean;
}

export const WorkupLogo: React.FC<WorkupLogoProps> = ({
  className = '',
  markHeight = 38,
}) => {
  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      <img
        src="/workup.png"
        alt="WORKUP Industrial Vehicle Rental"
        style={{ height: markHeight, width: 'auto' }}
        className="object-contain transition-transform duration-200 group-hover:scale-[1.02]"
        referrerPolicy="no-referrer"
      />
      <span className="text-[9px] uppercase font-bold tracking-widest bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30 shrink-0">
        B2B
      </span>
    </div>
  );
};
