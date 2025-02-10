import { JSX, ReactNode } from 'react';

export interface App {
  id: string;
  title: string;
  icon: string | ReactNode;
  content: ReactNode;
}

export interface WindowPosition {
  x: number;
  y: number;
  width?: number;
  height?: number;
  isMaximized?: boolean;
  isMinimized?: boolean;
  zIndex?: number;
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
  isMaximized: boolean;
  position: WindowState;
  children: ReactNode;
}

export interface WindowState {
  x: number;
  y: number;
  width?: number;
  height?: number;
  isMaximized: boolean;
  isMinimized: boolean;
  zIndex: number;
}


export interface GitHubProject {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
}

export interface Social {
  platform: string;
  url: string;
  icon: JSX.Element;
}

export interface Channel {
  name: string;
  url: string;
  description: string;
  featuredVideo: string;
  subscribers: string;
  views: string;
  videos: string;
  joined: string;
  location: string;
  email: string;
  socials: Social[];
}

export interface CpuUsageData {
  value: number;
  time: string;
}

export interface SystemMonitorWidgetProps {
  cpuUsage: CpuUsageData[];
}

export interface ClockWidgetProps {
  time: Date;
}