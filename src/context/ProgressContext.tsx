"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface LessonProgress {
  lessonId: number;
  flashcardsCompleted: boolean;
  toneQuizScore: number | null;
  toneQuizTotal: number;
  fillBlankScore: number | null;
  fillBlankTotal: number;
  dialogueViewed: boolean;
  completedAt?: string;
}

interface ProgressContextType {
  progress: Record<number, LessonProgress>;
  updateFlashcards: (lessonId: number) => void;
  updateToneQuiz: (lessonId: number, score: number, total: number) => void;
  updateFillBlank: (lessonId: number, score: number, total: number) => void;
  updateDialogue: (lessonId: number) => void;
  getLessonProgress: (lessonId: number) => LessonProgress;
  isLessonComplete: (lessonId: number) => boolean;
  totalCompleted: number;
}

const defaultProgress = (lessonId: number): LessonProgress => ({
  lessonId,
  flashcardsCompleted: false,
  toneQuizScore: null,
  toneQuizTotal: 0,
  fillBlankScore: null,
  fillBlankTotal: 0,
  dialogueViewed: false,
});

const ProgressContext = createContext<ProgressContextType | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<Record<number, LessonProgress>>({});

  useEffect(() => {
    const saved = localStorage.getItem("hsk1-progress");
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  const save = (updated: Record<number, LessonProgress>) => {
    setProgress(updated);
    localStorage.setItem("hsk1-progress", JSON.stringify(updated));
  };

  const updateFlashcards = (lessonId: number) => {
    const current = progress[lessonId] ?? defaultProgress(lessonId);
    const updated = { ...progress, [lessonId]: { ...current, flashcardsCompleted: true } };
    save(updated);
  };

  const updateToneQuiz = (lessonId: number, score: number, total: number) => {
    const current = progress[lessonId] ?? defaultProgress(lessonId);
    const updated = { ...progress, [lessonId]: { ...current, toneQuizScore: score, toneQuizTotal: total } };
    save(updated);
  };

  const updateFillBlank = (lessonId: number, score: number, total: number) => {
    const current = progress[lessonId] ?? defaultProgress(lessonId);
    const updated = { ...progress, [lessonId]: { ...current, fillBlankScore: score, fillBlankTotal: total } };
    save(updated);
  };

  const updateDialogue = (lessonId: number) => {
    const current = progress[lessonId] ?? defaultProgress(lessonId);
    const updated = { ...progress, [lessonId]: { ...current, dialogueViewed: true } };
    save(updated);
  };

  const getLessonProgress = (lessonId: number) =>
    progress[lessonId] ?? defaultProgress(lessonId);

  const isLessonComplete = (lessonId: number) => {
    const p = progress[lessonId];
    if (!p) return false;
    return p.flashcardsCompleted && p.dialogueViewed && p.toneQuizScore !== null && p.fillBlankScore !== null;
  };

  const totalCompleted = Object.keys(progress).filter((id) => isLessonComplete(Number(id))).length;

  return (
    <ProgressContext.Provider value={{ progress, updateFlashcards, updateToneQuiz, updateFillBlank, updateDialogue, getLessonProgress, isLessonComplete, totalCompleted }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
