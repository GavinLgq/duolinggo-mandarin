"use client";

import Link from "next/link";
import { lessons } from "@/data/lessons";
import { useProgress } from "@/context/ProgressContext";

export default function Home() {
  const { isLessonComplete, totalCompleted, getLessonProgress } = useProgress();

  return (
    <div>
      {/* Header banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">标准教程 HSK 1</h2>
            <p className="text-red-100 text-sm">Standard Course — 15 Pelajaran</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">{totalCompleted}</div>
            <div className="text-xs text-red-200">/ 15 selesai</div>
          </div>
        </div>
        <div className="mt-4 bg-red-800/40 rounded-full h-2">
          <div
            className="bg-yellow-400 h-2 rounded-full transition-all"
            style={{ width: `${(totalCompleted / 15) * 100}%` }}
          />
        </div>
        <p className="text-xs text-red-200 mt-2">Progres keseluruhan: {Math.round((totalCompleted / 15) * 100)}%</p>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
          <div className="text-2xl mb-1">📚</div>
          <div className="text-xs text-gray-500">Kosakata</div>
          <div className="font-bold text-gray-800">150+ kata</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
          <div className="text-2xl mb-1">🎵</div>
          <div className="text-xs text-gray-500">Nada / Tones</div>
          <div className="font-bold text-gray-800">4 nada</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
          <div className="text-2xl mb-1">💬</div>
          <div className="text-xs text-gray-500">Dialog</div>
          <div className="font-bold text-gray-800">20+ dialog</div>
        </div>
      </div>

      {/* Lesson list */}
      <h3 className="font-bold text-gray-700 mb-3 text-sm uppercase tracking-wide">Daftar Pelajaran</h3>
      <div className="space-y-3">
        {lessons.map((lesson) => {
          const complete = isLessonComplete(lesson.id);
          const prog = getLessonProgress(lesson.id);
          const started = prog.flashcardsCompleted || prog.dialogueViewed || prog.toneQuizScore !== null || prog.fillBlankScore !== null;

          return (
            <Link key={lesson.id} href={`/lesson/${lesson.id}`}>
              <div className={`bg-white rounded-xl p-4 shadow-sm border transition-all hover:shadow-md hover:-translate-y-0.5 flex items-center gap-4 cursor-pointer ${complete ? "border-green-200" : "border-gray-100"}`}>
                {/* Lesson number */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 ${complete ? "bg-green-500" : "bg-red-500"}`}>
                  {complete ? "✓" : lesson.id}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-bold text-gray-900 text-lg">{lesson.hanzi}</span>
                    <span className="text-sm text-gray-400">{lesson.pinyin}</span>
                  </div>
                  <div className="text-sm text-gray-500">{lesson.english}</div>

                  {/* Mini progress bar */}
                  {started && !complete && (
                    <div className="mt-1 flex gap-1">
                      {[
                        prog.flashcardsCompleted,
                        prog.dialogueViewed,
                        prog.toneQuizScore !== null,
                        prog.fillBlankScore !== null,
                      ].map((done, i) => (
                        <div
                          key={i}
                          className={`h-1 w-6 rounded-full ${done ? "bg-red-400" : "bg-gray-200"}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Arrow */}
                <div className="text-gray-300 flex-shrink-0">›</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="mt-8 text-center text-xs text-gray-400">
        Berdasarkan buku HSK Standard Course 1 Workbook
      </div>
    </div>
  );
}
