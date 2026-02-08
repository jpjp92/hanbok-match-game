export type Difficulty = 'easy' | 'normal';

export interface CardType {
  id: number;
  imageId: number;
  src: string;
  matched: boolean;
}

export interface ModalProps {
  turns: number;
  time: number;
  onRestart: () => void;
  onToMenu: () => void;
  onShowLeaderboard: () => void;
}

export interface CardProps {
  card: CardType;
  handleChoice: (card: CardType) => void;
  flipped: boolean;
  disabled: boolean;
  difficulty: Difficulty;
}

export interface StartScreenProps {
  onStart: (difficulty: Difficulty, name: string) => void;
  onShowLeaderboard: () => void;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  difficulty: Difficulty;
  turns: number;
  time: number;
  timestamp: number;
}

export interface LeaderboardProps {
  entries: LeaderboardEntry[];
  isOpen: boolean;
  onClose: () => void;
  initialTab?: Difficulty;
}