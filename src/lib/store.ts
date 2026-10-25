'use client';

import { useState, useEffect } from 'react';
import { CURRICULUM_DATA, SANDBOX_INSTRUMENTS, INITIAL_BADGES, Badge } from './data';

export interface UserProfile {
  name: string;
  email: string;
  educationLevel: string;
  financialGoal: string;
  stage: 'START' | 'LEARN' | 'TEST' | 'TRACK' | 'IMPROVE' | 'PRACTISE';
  baselineScore: number | null;
  baselineCompleted: boolean;
  streakDays: number;
  overallMastery: number; // 0-100%
}

export interface Holding {
  instrumentId: string;
  units: number;
  avgBuyPrice: number;
}

export interface Trade {
  id: string;
  type: 'BUY' | 'SELL';
  instrumentId: string;
  instrumentName: string;
  units: number;
  price: number;
  total: number;
  timestamp: string;
  rationale?: string;
}

export interface MisconceptionRecord {
  id: string;
  questionId: string;
  misconception: string;
  moduleId: string;
  timestamp: string;
  resolved: boolean;
}

export interface AppState {
  profile: UserProfile;
  completedLessonIds: string[];
  passedQuizIds: string[];
  misconceptions: MisconceptionRecord[];
  portfolio: {
    cashBalance: number; // initial ₹10,000
    holdings: Holding[];
    trades: Trade[];
  };
  badges: Badge[];
  finnChat: {
    id: string;
    sender: 'user' | 'finn';
    text: string;
    timestamp: string;
  }[];
}

const DEFAULT_STATE: AppState = {
  profile: {
    name: 'Govardhan',
    email: 'govardhan@example.com',
    educationLevel: 'College Student',
    financialGoal: 'Learn foundational investing & avoid costly rookie mistakes',
    stage: 'LEARN',
    baselineScore: 80,
    baselineCompleted: true,
    streakDays: 4,
    overallMastery: 42
  },
  completedLessonIds: ['mf-1', 'mf-2', 'sc-1'],
  passedQuizIds: ['q-mf-1'],
  misconceptions: [
    {
      id: 'misc-1',
      questionId: 'q-sc-1',
      misconception: 'Arithmetic Calculation Error',
      moduleId: 'saving-compounding',
      timestamp: 'Yesterday',
      resolved: false
    }
  ],
  portfolio: {
    cashBalance: 4500,
    holdings: [
      {
        instrumentId: 'nifty50',
        units: 15,
        avgBuyPrice: 245.50
      },
      {
        instrumentId: 'liquid_fd',
        units: 18,
        avgBuyPrice: 100.00
      }
    ],
    trades: [
      {
        id: 'tr-1',
        type: 'BUY',
        instrumentId: 'nifty50',
        instrumentName: 'Nifty 50 Index Fund ETF',
        units: 15,
        price: 245.50,
        total: 3682.50,
        timestamp: '2 days ago',
        rationale: 'Core large cap diversification as recommended in Module 5.'
      },
      {
        id: 'tr-2',
        type: 'BUY',
        instrumentId: 'liquid_fd',
        instrumentName: 'Liquid Cash Buffer / Overnight FD',
        units: 18,
        price: 100.00,
        total: 1800.00,
        timestamp: 'Yesterday',
        rationale: 'Emergency liquidity cushion before adding higher volatility instruments.'
      }
    ]
  },
  badges: INITIAL_BADGES,
  finnChat: [
    {
      id: 'msg-1',
      sender: 'finn',
      text: 'Hello Govardhan! I am Finn, your Socratic finance coach. Ask me about compounding math, inflation mechanics, or let me evaluate your portfolio allocation.',
      timestamp: '10:00 AM'
    }
  ]
};

const STORAGE_KEY = 'todirect_user_state_v2';

export function getStoredState(): AppState {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_STATE;
  }
}

export function saveStoredState(state: AppState) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
}

export function useAppState() {
  const [state, setState] = useState<AppState>(DEFAULT_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setState(getStoredState());
    setIsLoaded(true);
  }, []);

  const updateState = (updater: (prev: AppState) => AppState) => {
    setState((prev) => {
      const next = updater(prev);
      saveStoredState(next);
      return next;
    });
  };

  const markLessonComplete = (lessonId: string) => {
    updateState((prev) => {
      if (prev.completedLessonIds.includes(lessonId)) return prev;
      const completed = [...prev.completedLessonIds, lessonId];
      // calculate mastery
      const totalLessons = CURRICULUM_DATA.reduce((acc, m) => acc + m.lessons.length, 0);
      const mastery = Math.min(100, Math.round((completed.length / totalLessons) * 100));
      return {
        ...prev,
        completedLessonIds: completed,
        profile: { ...prev.profile, overallMastery: mastery }
      };
    });
  };

  const recordQuizPass = (quizId: string) => {
    updateState((prev) => {
      if (prev.passedQuizIds.includes(quizId)) return prev;
      return {
        ...prev,
        passedQuizIds: [...prev.passedQuizIds, quizId]
      };
    });
  };

  const recordMisconception = (questionId: string, misconception: string, moduleId: string) => {
    updateState((prev) => {
      const record: MisconceptionRecord = {
        id: `misc-${Date.now()}`,
        questionId,
        misconception,
        moduleId,
        timestamp: 'Just now',
        resolved: false
      };
      return {
        ...prev,
        misconceptions: [record, ...prev.misconceptions]
      };
    });
  };

  const executeTrade = (
    type: 'BUY' | 'SELL',
    instrumentId: string,
    instrumentName: string,
    units: number,
    price: number,
    rationale?: string
  ) => {
    updateState((prev) => {
      const total = units * price;
      let newCash = prev.portfolio.cashBalance;
      let currentHoldings = [...prev.portfolio.holdings];

      if (type === 'BUY') {
        if (newCash < total) return prev; // insufficient funds
        newCash -= total;
        const existing = currentHoldings.find((h) => h.instrumentId === instrumentId);
        if (existing) {
          const totalExistingCost = existing.units * existing.avgBuyPrice;
          const totalNewCost = totalExistingCost + total;
          existing.units += units;
          existing.avgBuyPrice = totalNewCost / existing.units;
        } else {
          currentHoldings.push({
            instrumentId,
            units,
            avgBuyPrice: price
          });
        }
      } else {
        const existing = currentHoldings.find((h) => h.instrumentId === instrumentId);
        if (!existing || existing.units < units) return prev; // cannot sell more than owned
        newCash += total;
        existing.units -= units;
        if (existing.units === 0) {
          currentHoldings = currentHoldings.filter((h) => h.instrumentId !== instrumentId);
        }
      }

      const trade: Trade = {
        id: `tr-${Date.now()}`,
        type,
        instrumentId,
        instrumentName,
        units,
        price,
        total,
        timestamp: 'Just now',
        rationale
      };

      return {
        ...prev,
        portfolio: {
          cashBalance: newCash,
          holdings: currentHoldings,
          trades: [trade, ...prev.portfolio.trades]
        }
      };
    });
  };

  const addChatMessage = (sender: 'user' | 'finn', text: string) => {
    updateState((prev) => ({
      ...prev,
      finnChat: [
        ...prev.finnChat,
        {
          id: `msg-${Date.now()}`,
          sender,
          text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    }));
  };

  const resetAllProgress = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    setState(DEFAULT_STATE);
  };

  return {
    state,
    isLoaded,
    markLessonComplete,
    recordQuizPass,
    recordMisconception,
    executeTrade,
    addChatMessage,
    resetAllProgress,
    updateState
  };
}
