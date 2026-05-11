"use client";

import { useState } from "react";
import { Lesson } from "@/data/lessons";
import { useProgress } from "@/context/ProgressContext";

export default function DialogueView({ lesson }: { lesson: Lesson }) {
  const { updateDialogue, getLessonProgress } = useProgress();
  const [selectedDialogue, setSelectedDialogue] = useState(0);
  const [showPinyin, setShowPinyin] = useState(true);
  const [showMeaning, setShowMeaning] = useState(true);
  const prog = getLessonProgress(lesson.id);

  const dialogue = lesson.dialogues[selectedDialogue];

  const speakerColors: Record<string, string> = {
    A: "bg-red-500",
    B: "bg-blue-500",
    Guru: "bg-purple-500",
    Murid: "bg-green-500",
    Pelayan: "bg-orange-500",
    Tamu: "bg-teal-500",
    Pembeli: "bg-pink-500",
    Penjual: "bg-yellow-600",
  };

  const getColor = (speaker: string) => speakerColors[speaker] ?? "bg-gray-500";
  const isRight = (speaker: string) => ["B", "Guru", "Pelayan", "Penjual"].includes(speaker);

  const handleView = () => {
    if (!prog.dialogueViewed) updateDialogue(lesson.id);
  };

  return (
    <div onClick={handleView}>
      {/* Dialogue selector */}
      {lesson.dialogues.length > 1 && (
        <div className="flex gap-2 mb-4 flex-wrap">
          {lesson.dialogues.map((d, i) => (
            <button
              key={d.id}
              onClick={() => setSelectedDialogue(i)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedDialogue === i ? "bg-red-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-red-300"}`}
            >
              Dialog {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Situation */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 mb-4 text-sm text-amber-800">
        <span className="font-medium">Situasi:</span> {dialogue.situation}
      </div>

      {/* Toggle options */}
      <div className="flex gap-3 mb-4">
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
          <input type="checkbox" checked={showPinyin} onChange={(e) => setShowPinyin(e.target.checked)} className="rounded accent-red-600" />
          Tampilkan Pinyin
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
          <input type="checkbox" checked={showMeaning} onChange={(e) => setShowMeaning(e.target.checked)} className="rounded accent-red-600" />
          Tampilkan Arti
        </label>
      </div>

      {/* Dialogue bubbles */}
      <div className="space-y-4 mb-6">
        {dialogue.lines.map((line, i) => {
          const right = isRight(line.speaker);
          return (
            <div key={i} className={`flex gap-3 ${right ? "flex-row-reverse" : ""}`}>
              <div className={`w-9 h-9 rounded-full ${getColor(line.speaker)} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                {line.speaker[0]}
              </div>
              <div className={`max-w-[75%] ${right ? "items-end" : "items-start"} flex flex-col gap-1`}>
                <div className="text-xs text-gray-400">{line.speaker}</div>
                <div className={`rounded-2xl px-4 py-3 ${right ? "bg-blue-50 border border-blue-100" : "bg-white border border-gray-100"} shadow-sm`}>
                  <p className="text-lg font-semibold text-gray-900 mb-1">{line.hanzi}</p>
                  {showPinyin && <p className="text-sm text-red-500">{line.pinyin}</p>}
                  {showMeaning && <p className="text-sm text-gray-500 italic">{line.meaning}</p>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Key vocabulary from dialogue */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
        <h4 className="font-semibold text-gray-700 mb-3 text-sm">📌 Frasa Kunci Pelajaran Ini</h4>
        <div className="grid gap-2">
          {lesson.keyPhrases.map((phrase, i) => (
            <div key={i} className="bg-white rounded-lg p-3 border border-gray-100 flex gap-3 items-start">
              <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                {i + 1}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{phrase.hanzi}</p>
                <p className="text-sm text-red-500">{phrase.pinyin}</p>
                <p className="text-sm text-gray-500">{phrase.meaning}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {prog.dialogueViewed && (
        <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-3 text-center text-green-700 text-sm font-medium">
          ✅ Dialog sudah kamu pelajari!
        </div>
      )}
    </div>
  );
}
