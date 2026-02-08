import React, { useState } from 'react';
import { LeaderboardProps, Difficulty } from '../types';

const Leaderboard: React.FC<LeaderboardProps> = ({ entries, isOpen, onClose, initialTab = 'normal' }) => {
  const [activeTab, setActiveTab] = useState<Difficulty>(initialTab);

  if (!isOpen) return null;

  // Filter and sort entries based on active tab
  // Sort priority: 1. Fewest Turns (asc), 2. Fastest Time (asc), 3. Most Recent (desc)
  const sortedEntries = entries
    .filter(entry => entry.difficulty === activeTab)
    .sort((a, b) => {
      if (a.turns !== b.turns) return a.turns - b.turns;
      if (a.time !== b.time) return a.time - b.time;
      return b.timestamp - a.timestamp;
    })
    .slice(0, 10); // Top 10

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <span className="text-xl md:text-2xl">🥇</span>;
      case 1: return <span className="text-xl md:text-2xl">🥈</span>;
      case 2: return <span className="text-xl md:text-2xl">🥉</span>;
      default: return <span className="text-k-blue font-bold text-base md:text-lg">{index + 1}</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      ></div>

      {/* Modal Content - Increased max-width to max-w-lg */}
      <div className="relative bg-white rounded-2xl md:rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-float flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-4 md:p-6 pb-2 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2 md:gap-3">
                <span className="text-2xl md:text-3xl">🏆</span>
                <h2 className="text-xl md:text-3xl font-black text-k-navy font-serif">HALL OF FAME</h2>
            </div>
            <button 
                onClick={onClose}
                className="p-2 text-stone-400 hover:text-k-red transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        {/* Tabs */}
        <div className="px-4 md:px-6 py-2 md:py-4 flex-shrink-0">
            <div className="flex bg-stone-100 p-1 rounded-xl">
                <button
                    onClick={() => setActiveTab('easy')}
                    className={`flex-1 py-2 rounded-lg text-xs md:text-sm font-bold transition-all duration-300 ${
                        activeTab === 'easy' 
                        ? 'bg-k-blue text-white shadow-md' 
                        : 'text-stone-500 hover:text-stone-700'
                    }`}
                >
                    EASY
                </button>
                <button
                    onClick={() => setActiveTab('normal')}
                    className={`flex-1 py-2 rounded-lg text-xs md:text-sm font-bold transition-all duration-300 ${
                        activeTab === 'normal' 
                        ? 'bg-k-blue text-white shadow-md' 
                        : 'text-stone-500 hover:text-stone-700'
                    }`}
                >
                    NORMAL
                </button>
            </div>
        </div>

        {/* List Header */}
        <div className="px-4 md:px-6 py-2 grid grid-cols-12 text-[10px] md:text-xs font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100 flex-shrink-0">
            <div className="col-span-2 text-center">Rank</div>
            <div className="col-span-6 pl-2">Player</div>
            <div className="col-span-2 text-center">Moves</div>
            <div className="col-span-2 text-right">Time</div>
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-2 custom-scrollbar">
            {sortedEntries.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 md:h-40 text-stone-400">
                    <span className="text-3xl md:text-4xl mb-2 opacity-50">📉</span>
                    <p className="text-sm">No records yet.</p>
                </div>
            ) : (
                <div className="space-y-1">
                    {sortedEntries.map((entry, index) => (
                        <div 
                            key={entry.id}
                            className={`grid grid-cols-12 items-center py-2 md:py-3 px-2 rounded-xl border border-transparent hover:bg-stone-50 transition-colors ${index < 3 ? 'bg-yellow-50/50' : ''}`}
                        >
                            <div className="col-span-2 flex justify-center">
                                {getRankIcon(index)}
                            </div>
                            <div className="col-span-6 pl-2 font-bold text-k-navy truncate text-sm md:text-base">
                                {entry.name}
                            </div>
                            <div className="col-span-2 text-center font-black text-k-blue text-base md:text-lg">
                                {entry.turns}
                            </div>
                            <div className="col-span-2 text-right text-stone-500 font-mono text-xs md:text-sm">
                                {entry.time}s
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

        {/* Footer Action */}
        <div className="p-4 md:p-6 border-t border-stone-100 bg-white z-10 flex-shrink-0">
            <button 
                onClick={onClose}
                className="w-full py-3 md:py-4 bg-k-blue hover:bg-k-navy text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 uppercase tracking-wide text-sm"
            >
                Back to Game
            </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;