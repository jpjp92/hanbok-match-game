import React, { useState } from 'react';
import { StartScreenProps } from '../types';

const StartScreen: React.FC<StartScreenProps> = ({ onStart, onShowLeaderboard }) => {
  const [name, setName] = useState('');

  const handleStart = (difficulty: 'easy' | 'normal') => {
    const finalName = name.trim() || 'Anonymous';
    onStart(difficulty, finalName);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto p-4 z-20 animate-fadeIn min-h-[60vh]">
      
      {/* Logo / Title Section */}
      <div className="text-center mb-8 md:mb-12 relative shrink-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-k-red/10 rounded-full blur-3xl -z-10"></div>
        <div className="inline-block mb-3 md:mb-4">
            <span className="text-k-red text-xs md:text-base tracking-[0.4em] font-sans font-bold uppercase border-b-2 border-k-red pb-1">Memory Game</span>
        </div>
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-k-navy mb-3 md:mb-6 tracking-tight drop-shadow-sm leading-tight">
            <span className="text-k-blue">Han</span>bok <span className="text-k-red">Match</span>
        </h1>
        <p className="text-stone-500 font-serif italic text-lg md:text-xl">Choose your challenge</p>
      </div>

      {/* Main Interaction Container - Vertical Stack */}
      <div className="w-full max-w-md flex flex-col gap-5 md:gap-6 shrink-0">
          
          {/* Input Section */}
          <div className="w-full relative">
            <label className="block text-center text-[10px] md:text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                Nickname
            </label>
            <input 
                type="text" 
                placeholder="Enter Nickname"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/80 md:bg-white/50 border-2 border-stone-200 focus:border-k-blue focus:bg-white rounded-2xl px-5 py-4 text-k-navy font-bold placeholder-stone-300 outline-none transition-all shadow-sm focus:shadow-md text-center text-lg md:text-xl"
            />
          </div>

          {/* Difficulty Buttons */}
          <div className="flex gap-3 w-full">
            <button 
                onClick={() => handleStart('easy')}
                className="flex-1 group relative bg-k-yellow border-b-4 border-yellow-600 rounded-2xl active:border-b-0 active:translate-y-1 transition-all py-4 md:py-5 hover:brightness-105"
            >
                <div className="flex items-center justify-center gap-3 md:gap-4">
                    <span className="text-3xl md:text-4xl filter drop-shadow-sm">🐤</span>
                    <div className="flex flex-col items-start">
                        <span className="text-lg md:text-xl font-black text-k-navy font-sans uppercase leading-none">Easy</span>
                        <span className="text-[10px] md:text-xs text-k-navy/70 font-bold uppercase tracking-wide leading-none mt-1">12 Cards</span>
                    </div>
                </div>
            </button>

            <button 
                onClick={() => handleStart('normal')}
                className="flex-1 group relative bg-k-yellow border-b-4 border-yellow-600 rounded-2xl active:border-b-0 active:translate-y-1 transition-all py-4 md:py-5 hover:brightness-105"
            >
                <div className="flex items-center justify-center gap-3 md:gap-4">
                    <span className="text-3xl md:text-4xl filter drop-shadow-sm">🐯</span>
                    <div className="flex flex-col items-start">
                        <span className="text-lg md:text-xl font-black text-k-navy font-sans uppercase leading-none">Normal</span>
                        <span className="text-[10px] md:text-xs text-k-navy/70 font-bold uppercase tracking-wide leading-none mt-1">16 Cards</span>
                    </div>
                </div>
            </button>
          </div>

          {/* Leaderboard Button */}
          <div className="w-full mt-2">
              <button 
                onClick={onShowLeaderboard}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-k-navy text-white rounded-xl font-bold shadow-soft hover:shadow-lg hover:bg-slate-800 active:scale-95 transition-all text-sm md:text-base group"
              >
                <span className="group-hover:scale-110 transition-transform duration-300">🏆</span>
                <span>View Hall of Fame</span>
              </button>
          </div>
      </div>
    </div>
  );
};

export default StartScreen;