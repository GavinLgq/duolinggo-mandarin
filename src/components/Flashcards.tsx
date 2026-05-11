"use client";

import { useState } from "react";
import { Lesson } from "@/data/lessons";
import { useProgress } from "@/context/ProgressContext";

export default function Flashcards({ lesson }: { lesson: Lesson }) {
  const { updateFlashcards, getLessonProgress } = useProgress();
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mode, setMode] = useState<"vocab" | "phrases">("vocab");

  const words = mode === "vocab" ? lesson.vocabulary : lesson.keyPhrases;
  const current = words[cardIndex];
  const prog = getLessonProgress(lesson.id);

  const next = () => {
    if (cardIndex < words.length - 1) {
      setCardIndex(cardIndex + 1);
      setFlipped(false);
    } else {
      updateFlashcards(lesson.id);
    }
  };

  const prev = () => {
    if (cardIndex > 0) {
      setCardIndex(cardIndex - 1);
      setFlipped(false);
    }
  };

  const reset = () => {
    setCardIndex(0);
    setFlipped(false);
  };

  const finished = cardIndex === words.length - 1 && prog.flashcardsCompleted;

  return (
    <div>
      {/* Mode toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => { setMode("vocab"); reset(); }}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${mode === "vocab" ? "bg-red-600 text-white" : "bg-white border border-gray-200 text-gray-600"}`}
        >
          Kosakata ({lesson.vocabulary.length})
        </button>
        <button
          onClick={() => { setMode("phrases"); reset(); }}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${mode === "phrases" ? "bg-red-600 text-white" : "bg-white border border-gray-200 text-gray-600"}`}
        >
          Frasa Kunci ({lesson.keyPhrases.length})
        </button>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1 mb-4 flex-wrap">
        {words.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCardIndex(i); setFlipped(false); }}
            className={`w-3 h-3 rounded-full transition-all ${i === cardIndex ? "bg-red-600 scale-125" : i < cardIndex ? "bg-red-300" : "bg-gray-200"}`}
          />
        ))}
      </div>

      {/* Flashcard */}
      <div
        className="bg-white rounded-2xl shadow-md border border-gray-100 cursor-pointer select-none mb-4 min-h-[220px] flex flex-col items-center justify-center p-8 text-center hover:shadow-lg transition-shadow"
        onClick={() => setFlipped(!flipped)}
      >
        {!flipped ? (
          <div>
            <div className="text-6xl font-bold text-gray-900 mb-2">{current.hanzi}</div>
            <div className="text-gray-400 text-sm mt-4">Ketuk untuk lihat arti</div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-4xl font-bold text-gray-900">{current.hanzi}</div>
            <div className="text-xl text-red-600 font-medium">{current.pinyin}</div>
            <div className="text-lg text-gray-700">{current.meaning}</div>
            {current.example && (
              <div className="mt-4 pt-4 border-t border-gray-100 text-left w-full">
                <p className="text-sm font-medium text-gray-500 mb-1">Contoh:</p>
                <p className="text-base font-semibold text-gray-800">{current.example}</p>
                <p className="text-sm text-red-500">{current.examplePinyin}</p>
                <p className="text-sm text-gray-500 italic">{current.exampleMeaning}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Card counter */}
      <div className="text-center text-sm text-gray-400 mb-4">
        {cardIndex + 1} / {words.length}
      </div>

      {/* Navigation */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={prev}
          disabled={cardIndex === 0}
          className="px-6 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 font-medium disabled:opacity-40 hover:bg-gray-50 transition-all"
        >
          ‹ Sebelumnya
        </button>
        <button
          onClick={() => setFlipped(!flipped)}
          className="px-6 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-all"
        >
          {flipped ? "Sembunyikan" : "Lihat Arti"}
        </button>
        <button
          onClick={next}
          className={`px-6 py-2.5 rounded-xl text-white font-medium transition-all ${cardIndex === words.length - 1 ? "bg-green-500 hover:bg-green-600" : "bg-red-600 hover:bg-red-700"}`}
        >
          {cardIndex === words.length - 1 ? "✓ Selesai" : "Selanjutnya ›"}
        </button>
      </div>

      {/* Completion badge */}
      {finished && (
        <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-3 text-center text-green-700 text-sm font-medium">
          ✅ Kamu sudah menyelesaikan semua kartu kosakata pelajaran ini!
        </div>
      )}
    </div>
  );
}
