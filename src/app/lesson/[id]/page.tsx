"use client";

import { useParams, useRouter } from "next/navigation";
import { lessons } from "@/data/lessons";
import { useState } from "react";
import Flashcards from "@/components/Flashcards";
import ToneQuiz from "@/components/ToneQuiz";
import FillBlank from "@/components/FillBlank";
import DialogueView from "@/components/DialogueView";
import { useProgress } from "@/context/ProgressContext";

type Tab = "vocab" | "dialogue" | "tones" | "quiz";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = Number(params.id);
  const lesson = lessons.find((l) => l.id === lessonId);
  const { isLessonComplete } = useProgress();

  const [activeTab, setActiveTab] = useState<Tab>("vocab");

  if (!lesson) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Pelajaran tidak ditemukan.</p>
        <button onClick={() => router.push("/")} className="mt-4 text-red-600 underline">
          Kembali ke beranda
        </button>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "vocab", label: "Kosakata", icon: "📚" },
    { id: "dialogue", label: "Dialog", icon: "💬" },
    { id: "tones", label: "Nada", icon: "🎵" },
    { id: "quiz", label: "Latihan", icon: "✏️" },
  ];

  const complete = isLessonComplete(lesson.id);

  return (
    <div>
      {/* Back + header */}
      <div className="mb-4">
        <button onClick={() => router.push("/")} className="text-sm text-red-600 flex items-center gap-1 mb-3 hover:opacity-75">
          ‹ Kembali
        </button>
        <div className={`rounded-2xl p-5 text-white ${complete ? "bg-gradient-to-r from-green-500 to-green-600" : "bg-gradient-to-r from-red-600 to-red-700"}`}>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs font-medium mb-1 opacity-80">Pelajaran {lesson.id}</div>
              <h2 className="text-3xl font-bold mb-1">{lesson.hanzi}</h2>
              <p className="text-sm opacity-90">{lesson.pinyin}</p>
              <p className="text-sm opacity-80 mt-1">{lesson.english}</p>
            </div>
            {complete && (
              <div className="bg-white/20 rounded-full p-2">
                <span className="text-2xl">✅</span>
              </div>
            )}
          </div>
          <div className="mt-3 flex gap-4 text-xs opacity-80">
            <span>📚 {lesson.vocabulary.length} kata</span>
            <span>💬 {lesson.dialogues.length} dialog</span>
            <span>🎵 {lesson.toneQuestions.length} soal nada</span>
            <span>✏️ {lesson.fillBlanks.length} latihan</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-red-600 text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-200 hover:border-red-300"
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "vocab" && <Flashcards lesson={lesson} />}
      {activeTab === "dialogue" && <DialogueView lesson={lesson} />}
      {activeTab === "tones" && <ToneQuiz lesson={lesson} />}
      {activeTab === "quiz" && <FillBlank lesson={lesson} />}
    </div>
  );
}
