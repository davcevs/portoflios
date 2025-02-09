import { ReactNode } from 'react';

export interface App {
  id: string;
  title: string;
  icon: string | ReactNode;
  content: ReactNode;
}

export interface WindowPosition {
  x: number;
  y: number;
}

export interface AppWindowProps {
  app: {
    title: string;
    icon: string | ReactNode;
  };
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMinimized: boolean;
  isMaximized?: boolean;
  position?: WindowPosition;
  children: ReactNode;
}