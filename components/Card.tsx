import React from 'react';
import { CardProps } from '../types';

const Card: React.FC<CardProps> = ({ card, handleChoice, flipped, disabled, difficulty }) => {
  const handleClick = () => {
    if (!disabled && !flipped) {
      handleChoice(card);
    }
  };

  // Determine card back color based on difficulty (Cheong-Hong: Blue-Red traditional concept)
  const backColorClass = difficulty === 'easy' ? 'bg-[#4A6FA5]' : 'bg-[#d65050]';
  const knotColor = difficulty === 'easy' ? '#E6B33D' : '#E6B33D'; // Gold knot works for both

  return (
    // Updated Aspect Ratio: aspect-square (1:1) for both mobile and desktop
    <div 
      className="relative group w-full aspect-square perspective-1000 cursor-pointer tap-highlight-transparent" 
      onClick={handleClick}
    >
      <div 
        className={`relative w-full h-full duration-500 preserve-3d transition-transform ${flipped ? 'rotate-y-180' : ''}`}
      >
        {/* Back of Card (Traditional Hanbok Style) */}
        <div className={`absolute inset-0 w-full h-full backface-hidden rounded-xl md:rounded-3xl shadow-card border-[3px] md:border-4 border-white overflow-hidden z-20 ${backColorClass}`}>
          
          {/* Traditional Lattice Pattern (Changhoji / Munsal) */}
          <div className="absolute inset-0 opacity-20"
               style={{
                 backgroundImage: `
                    linear-gradient(45deg, #fff 1px, transparent 1px),
                    linear-gradient(-45deg, #fff 1px, transparent 1px)
                 `,
                 backgroundSize: '12px 12px'
               }}
          ></div>

          {/* Inner Border (Double line effect) */}
          <div className="absolute inset-1.5 md:inset-2 border border-white/30 rounded-lg md:rounded-2xl"></div>

          {/* Corner Decorations (Gwijangsik styling) */}
          <div className="absolute top-1.5 left-1.5 w-3 h-3 md:w-5 md:h-5 border-t-2 border-l-2 border-white/60 rounded-tl-lg"></div>
          <div className="absolute top-1.5 right-1.5 w-3 h-3 md:w-5 md:h-5 border-t-2 border-r-2 border-white/60 rounded-tr-lg"></div>
          <div className="absolute bottom-1.5 left-1.5 w-3 h-3 md:w-5 md:h-5 border-b-2 border-l-2 border-white/60 rounded-bl-lg"></div>
          <div className="absolute bottom-1.5 right-1.5 w-3 h-3 md:w-5 md:h-5 border-b-2 border-r-2 border-white/60 rounded-br-lg"></div>

          {/* Center Emblem (Norigae / Maedeup Style) */}
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="relative flex flex-col items-center justify-center">
                
                {/* The Pendant Main Body */}
                <div className={`relative w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-[${knotColor}]`}>
                    {/* Inner Decorative Ring */}
                    <div className="absolute inset-1 rounded-full border border-dashed border-stone-300"></div>
                    
                    {/* Traditional Pattern SVG */}
                    <svg viewBox="0 0 100 100" className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 text-k-red/80 drop-shadow-sm">
                      <path 
                        fill="currentColor" 
                        d="M50 20c-5 0-10 5-10 10s5 10 10 10 10-5 10-10-5-10-10-10zm25 25c0-5-5-10-10-10s-10 5-10 10 5 10 10 10 10-5 10-10zM25 45c0-5 5-10 10-10s10 5 10 10-5 10-10 10-10-5-10-10zm25 25c-5 0-10 5-10 10s5 10 10 10 10-5 10-10-5-10-10-10z" 
                      />
                      <circle cx="50" cy="50" r="8" fill={knotColor} />
                    </svg>
                </div>

                {/* Tassel (Norigae) hanging down */}
                <div className="absolute top-full mt-[-4px] flex flex-col items-center opacity-90">
                    {/* Knot */}
                    <div className={`w-1.5 h-1.5 md:w-2 md:h-2 bg-[${knotColor}] rounded-full mb-0.5 shadow-sm`}></div>
                    {/* Tassel Threads */}
                    <div className="flex gap-0.5 md:gap-1">
                        <div className="w-0.5 h-3 md:w-1 md:h-5 bg-white/80 rounded-b-full"></div>
                        <div className={`w-0.5 h-4 md:w-1 md:h-7 bg-[${knotColor}] rounded-b-full`}></div>
                        <div className="w-0.5 h-3 md:w-1 md:h-5 bg-white/80 rounded-b-full"></div>
                    </div>
                </div>

             </div>
          </div>
        </div>

        {/* Front of Card (Image) */}
        <div className="absolute inset-0 w-full h-full rotate-y-180 backface-hidden rounded-xl md:rounded-3xl overflow-hidden shadow-card bg-white border-[3px] md:border-4 border-white z-10">
          <div className="w-full h-full relative">
            <img 
              src={card.src} 
              alt="card front" 
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/400x500?text=Hanbok';
              }}
            />
            {/* Inner frame overlay */}
            <div className="absolute inset-0 border-[4px] md:border-[6px] border-rose-100/50 pointer-events-none rounded-lg md:rounded-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;