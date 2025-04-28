import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MatchResult } from "./types";

interface CachedMatchResult {
  data: MatchResult;
  timestamp: number;
}

interface MatchStore {
  cache: Record<string, CachedMatchResult>;
  getMatch: (candidateId: string, jobId: string) => Promise<MatchResult | null>;
  setMatch: (candidateId: string, jobId: string, data: MatchResult) => void;
  isExpired: (timestamp: number) => boolean;
}

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

export const useMatchStore = create<MatchStore>()(
  persist(
    (set, get) => ({
      cache: {},

      getMatch: async (candidateId: string, jobId: string) => {
        const key = `${candidateId}-${jobId}`;
        const cached = get().cache[key];

        if (cached && !get().isExpired(cached.timestamp)) {
          return cached.data;
        }

        try {
          const response = await fetch(
            `http://localhost:3000/api/match/${candidateId}/${jobId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch match result");
          }
          const data = await response.json();
          get().setMatch(candidateId, jobId, data);
          return data;
        } catch (error) {
          console.error("Error fetching match result:", error);
          return null;
        }
      },

      setMatch: (candidateId: string, jobId: string, data: MatchResult) => {
        const key = `${candidateId}-${jobId}`;
        set((state) => ({
          cache: {
            ...state.cache,
            [key]: {
              data,
              timestamp: Date.now(),
            },
          },
        }));
      },

      isExpired: (timestamp: number) => {
        return Date.now() - timestamp > CACHE_DURATION;
      },
    }),
    {
      name: "match-store", // unique name for localStorage
      partialize: (state) => ({ cache: state.cache }), // only persist the cache
    }
  )
);
