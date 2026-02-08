import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import Modal from './components/Modal';
import StartScreen from './components/StartScreen';
import Leaderboard from './components/Leaderboard';
import { CardType, Difficulty, LeaderboardEntry } from './types';
import { HANBOK_IMAGES } from './constants';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<'menu' | 'playing'>('menu');
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');
  const [playerName, setPlayerName] = useState<string>('');

  const [cards, setCards] = useState<CardType[]>([]);
  const [turns, setTurns] = useState<number>(0);
  const [time, setTime] = useState<number>(0);

  const [choiceOne, setChoiceOne] = useState<CardType | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<CardType | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isWon, setIsWon] = useState<boolean>(false);

  // Leaderboard State
  const [leaderboardOpen, setLeaderboardOpen] = useState<boolean>(false);
  const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>([]);

  // Load leaderboard from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('hanbok-leaderboard');
    if (saved) {
      try {
        setLeaderboardEntries(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse leaderboard", e);
      }
    }
  }, []);

  // Timer Logic
  useEffect(() => {
    let interval: number;
    if (gameState === 'playing' && !isWon) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState, isWon]);

  const startGame = (selectedDifficulty: Difficulty, name: string) => {
    setDifficulty(selectedDifficulty);
    setPlayerName(name);
    setGameState('playing');
    shuffleCards(selectedDifficulty);
  };

  const shuffleCards = (diff: Difficulty = difficulty) => {
    const cardCount = diff === 'easy' ? 6 : 8; // Easy: 12 cards, Normal: 16 cards

    // Randomly select 'cardCount' images from the full pool of 15 images
    // This ensures all animals get a chance to appear in different games
    const shuffledSource = [...HANBOK_IMAGES].sort(() => Math.random() - 0.5);
    const selection = shuffledSource.slice(0, cardCount);

    // Image Preloading to prevent flickering
    selection.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const shuffledCards = [...selection, ...selection]
      .sort(() => Math.random() - 0.5)
      .map((src, index) => ({
        id: Math.random(),
        imageId: selection.indexOf(src),
        src,
        matched: false
      }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setTime(0);
    setIsWon(false);
    setDisabled(false);
  };

  const handleChoice = (card: CardType) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const backToMenu = () => {
    setGameState('menu');
    setChoiceOne(null);
    setChoiceTwo(null);
    setIsWon(false);
    setLeaderboardOpen(false);
  };

  const saveScore = () => {
    const newEntry: LeaderboardEntry = {
      id: Date.now().toString(),
      name: playerName,
      difficulty,
      turns,
      time,
      timestamp: Date.now()
    };

    const updatedEntries = [...leaderboardEntries, newEntry];
    setLeaderboardEntries(updatedEntries);
    localStorage.setItem('hanbok-leaderboard', JSON.stringify(updatedEntries));
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            }
            return card;
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.matched) && !isWon) {
      setIsWon(true);
      saveScore();
    }
  }, [cards]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  };

  return (
    // Used h-dvh for better mobile browser support (address bar handling)
    <div className="h-dvh flex flex-col items-center py-4 px-3 md:px-8 font-serif text-k-text overflow-hidden relative select-none bg-gradient-to-br from-[#F8F5F2] to-[#eeeae6]">

      {/* Background Decorative elements - Positioned for wider layout */}
      <div className="absolute top-0 left-0 w-48 h-48 md:w-96 md:h-96 bg-k-red opacity-5 rounded-full -translate-x-1/3 -translate-y-1/3 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 md:w-[32rem] md:h-[32rem] bg-k-blue opacity-5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none"></div>

      {gameState === 'menu' ? (
        <div className="flex-1 flex items-center justify-center w-full h-full overflow-y-auto">
          <StartScreen
            onStart={startGame}
            onShowLeaderboard={() => setLeaderboardOpen(true)}
          />
        </div>
      ) : (
        <>
          {/* Header - Increased max-width to max-w-2xl for better desktop balance */}
          <header className="w-full max-w-2xl mb-4 z-10 flex-shrink-0 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={backToMenu}
                  className="p-2.5 -ml-2 rounded-full active:bg-stone-200 text-stone-500 hover:text-k-navy hover:bg-white/50 transition-all"
                  title="Back to Menu"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-xl md:text-3xl font-black text-k-navy leading-none">
                    Hanbok Match
                  </h1>
                  <p className="text-[10px] md:text-xs font-sans text-stone-400 font-bold uppercase tracking-wide mt-0.5">
                    {difficulty} • {playerName}
                  </p>
                </div>
              </div>

              <button
                onClick={() => shuffleCards()}
                className="p-2.5 bg-white text-k-navy rounded-full shadow-soft hover:shadow-md border border-stone-100 transition-all active:scale-95 group"
                title="Restart"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>

            {/* Stats Bar */}
            <div className="flex justify-between items-center bg-white/60 backdrop-blur-sm rounded-2xl px-5 py-3 border border-stone-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-stone-400 font-sans text-[10px] uppercase font-bold leading-none">Turns</span>
                  <span className="text-lg font-bold text-k-navy tabular-nums leading-tight">{turns}</span>
                </div>
              </div>
              <div className="w-px h-8 bg-stone-200/60"></div>
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-stone-400 font-sans text-[10px] uppercase font-bold leading-none">Time</span>
                  <span className="text-lg font-bold text-k-navy tabular-nums leading-tight">{time}s</span>
                </div>
                <div className="p-1.5 bg-amber-50 rounded-lg text-amber-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </header>

          {/* Game Grid Container */}
          <div className="w-full max-w-2xl z-10 flex-grow flex items-start md:items-center justify-center overflow-y-auto pb-4 pt-6 md:pt-0 custom-scrollbar transition-all duration-300">
            <div className={`grid gap-2 md:gap-5 w-full justify-items-center grid-cols-4`}>
              {cards.map(card => (
                <Card
                  key={card.id}
                  card={card}
                  handleChoice={handleChoice}
                  flipped={card === choiceOne || card === choiceTwo || card.matched}
                  disabled={disabled}
                  difficulty={difficulty}
                />
              ))}
            </div>
          </div>
        </>
      )}


      {isWon && (
        <Modal
          turns={turns}
          time={time}
          onRestart={() => shuffleCards()}
          onToMenu={backToMenu}
          onShowLeaderboard={() => setLeaderboardOpen(true)}
        />
      )}

      <Leaderboard
        isOpen={leaderboardOpen}
        onClose={() => setLeaderboardOpen(false)}
        entries={leaderboardEntries}
        initialTab={difficulty}
      />
    </div>
  );
};

export default App;