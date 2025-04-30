import { create } from 'zustand'

interface InterviewStore {
  interviews: any[];
  setInterviews: (interviews: any[]) => void;
}

export const useInterviewStore = create<InterviewStore>((set) => ({
  interviews: [],
  setInterviews: (interviews) => set({ interviews }),
}));
