import React from 'react';
import { ModalProps } from '../types';

const Modal: React.FC<ModalProps> = ({ turns, time, onRestart, onToMenu, onShowLeaderboard }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-k-navy/60 backdrop-blur-md animate-fadeIn"></div>
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-10 max-w-sm w-full text-center border border-white/50 overflow-hidden animate-float">
        
        {/* Decorative corner patterns */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-k-red rounded-tl-2xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-k-blue rounded-br-2xl opacity-20"></div>

        <div className="mb-4">
           <div className="w-20 h-20 bg-k-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4 text-k-yellow border-2 border-k-yellow/30 shadow-inner">
             <span className="text-4xl">🎉</span>
           </div>
        </div>

        <h2 className="text-3xl font-serif font-black text-k-navy mb-2">
          Mission Complete!
        </h2>
        
        <div className="flex justify-center gap-6 mb-8 text-stone-600">
            <div className="flex flex-col">
                <span className="text-xs uppercase font-bold tracking-wider text-stone-400">Turns</span>
                <strong className="text-k-blue text-2xl font-black">{turns}</strong>
            </div>
            <div className="w-px bg-stone-200"></div>
            <div className="flex flex-col">
                <span className="text-xs uppercase font-bold tracking-wider text-stone-400">Time</span>
                <strong className="text-k-blue text-2xl font-black">{time}s</strong>
            </div>
        </div>
        
        <div className="flex flex-col gap-3">
          <button 
              onClick={onRestart}
              className="w-full py-3.5 bg-k-navy hover:bg-k-blue text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
              Play Again
          </button>
          
          <button 
              onClick={onShowLeaderboard}
              className="w-full py-3.5 bg-k-yellow hover:bg-yellow-400 text-k-navy font-bold rounded-xl shadow-md transition-all duration-300"
          >
              🏆 Hall of Fame
          </button>

          <button 
              onClick={onToMenu}
              className="w-full py-3.5 bg-transparent hover:bg-stone-100 text-stone-500 font-bold rounded-xl border border-stone-200 transition-all duration-300"
          >
              Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;