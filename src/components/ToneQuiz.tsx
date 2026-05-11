"use client";

import { useState } from "react";
import { Lesson } from "@/data/lessons";
import { useProgress } from "@/context/ProgressContext";

const TONE_MARKS: Record<string, string> = {
  "1": "— (datar)",
  "2": "/ (naik)",
  "3": "∨ (turun-naik)",
  "4": "\\ (turun)",
};

function getToneNumber(pinyin: string): string {
  if (/[āēīōūǖ]/.test(pinyin)) return "1";
  if (/[áéíóúǘ]/.test(pinyin)) return "2";
  if (/[ǎěǐǒǔǚ]/.test(pinyin)) return "3";
  if (/[àèìòùǜ]/.test(pinyin)) return "4";
  return "0";
}

export default function ToneQuiz({ lesson }: { lesson: Lesson }) {
  const { updateToneQuiz, getLessonProgress } = useProgress();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<(boolean | null)[]>(new Array(lesson.toneQuestions.length).fill(null));
  const [finished, setFinished] = useState(false);
  const prog = getLessonProgress(lesson.id);

  const question = lesson.toneQuestions[current];

  const handleSelect = (option: string) => {
    if (selected !== null) return;
    setSelected(option);
    const correct = option === question.answer;
    const updated = [...answers];
    updated[current] = correct;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (current < lesson.toneQuestions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      const score = answers.filter(Boolean).length;
      updateToneQuiz(lesson.id, score, lesson.toneQuestions.length);
      setFinished(true);
    }
  };

  const reset = () => {
    setCurrent(0);
    setSelected(null);
    setAnswers(new Array(lesson.toneQuestions.length).fill(null));
    setFinished(false);
  };

  if (finished) {
    const score = answers.filter(Boolean).length;
    const total = lesson.toneQuestions.length;
    const pct = Math.round((score / total) * 100);
    return (
      <div className="text-center py-6">
        <div className={`text-6xl mb-4 ${pct >= 70 ? "" : ""}`}>
          {pct === 100 ? "🏆" : pct >= 70 ? "🎉" : "📖"}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {score} / {total} Benar
        </h3>
        <p className="text-gray-500 mb-1">{pct}% tepat</p>
        <p className="text-sm text-gray-400 mb-6">
          {pct === 100 ? "Sempurna! Kamu menguasai semua nada!" : pct >= 70 ? "Bagus! Terus latihan nada!" : "Ayo ulangi lagi untuk hafal nada!"}
        </p>
        <div className="grid grid-cols-2 gap-3 mb-6 max-w-xs mx-auto">
          {lesson.toneQuestions.map((q, i) => (
            <div key={q.id} className={`rounded-xl p-3 text-sm ${answers[i] ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
              <div className="font-semibold">{q.answer}</div>
              <div className="text-xs text-gray-500">{q.meaning}</div>
              <div className={`text-xs font-medium mt-1 ${answers[i] ? "text-green-600" : "text-red-500"}`}>
                {answers[i] ? "✓ Benar" : `✗ Jawaban: ${q.answer}`}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-all">
            Ulangi Quiz
          </button>
        </div>
        {prog.toneQuizScore !== null && (
          <p className="mt-4 text-xs text-gray-400">Skor terbaik tersimpan: {prog.toneQuizScore}/{prog.toneQuizTotal}</p>
        )}
      </div>
    );
  }

  return (
    <div>
      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-4 text-sm text-blue-700">
        <span className="font-medium">🎵 Latihan Nada:</span> Pilih penulisan pinyin yang <strong>benar</strong> dengan tanda nada yang tepat.
      </div>

      {/* Tone reference */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {Object.entries(TONE_MARKS).map(([num, desc]) => (
          <div key={num} className="bg-white border border-gray-100 rounded-lg p-2 text-center">
            <div className="text-xs font-bold text-red-600">Nada {num}</div>
            <div className="text-xs text-gray-500">{desc}</div>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex gap-1 flex-1">
          {lesson.toneQuestions.map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full ${i < current ? (answers[i] ? "bg-green-400" : "bg-red-400") : i === current ? "bg-red-600" : "bg-gray-200"}`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-500 whitespace-nowrap">{current + 1}/{lesson.toneQuestions.length}</span>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4 text-center">
        <p className="text-sm text-gray-400 mb-2">Pilih pinyin yang benar untuk:</p>
        <div className="text-4xl font-bold text-gray-900 mb-1">{question.word.replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/g, (c) => {
          const map: Record<string, string> = { ā: "a", á: "a", ǎ: "a", à: "a", ē: "e", é: "e", ě: "e", è: "e", ī: "i", í: "i", ǐ: "i", ì: "i", ō: "o", ó: "o", ǒ: "o", ò: "o", ū: "u", ú: "u", ǔ: "u", ù: "u", ǖ: "v", ǘ: "v", ǚ: "v", ǜ: "v" };
          return map[c] ?? c;
        })}</div>
        <div className="text-gray-500 text-base">{question.meaning}</div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {question.options.map((opt) => {
          const isCorrect = opt === question.answer;
          const isSelected = opt === selected;
          let style = "bg-white border-gray-200 text-gray-800 hover:border-red-300 hover:bg-red-50";
          if (selected !== null) {
            if (isCorrect) style = "bg-green-50 border-green-400 text-green-800";
            else if (isSelected) style = "bg-red-50 border-red-400 text-red-800";
            else style = "bg-white border-gray-200 text-gray-400 opacity-60";
          }
          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={selected !== null}
              className={`border-2 rounded-xl p-4 text-center font-medium text-lg transition-all ${style}`}
            >
              {opt}
              {selected !== null && isCorrect && <span className="text-green-500 ml-2">✓</span>}
              {selected !== null && isSelected && !isCorrect && <span className="text-red-500 ml-2">✗</span>}
            </button>
          );
        })}
      </div>

      {/* Feedback + next */}
      {selected && (
        <div className={`rounded-xl p-3 mb-4 text-sm font-medium ${selected === question.answer ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {selected === question.answer ? "🎉 Benar! Bagus sekali!" : `❌ Salah. Jawaban benar: ${question.answer}`}
        </div>
      )}

      {selected && (
        <button
          onClick={handleNext}
          className="w-full py-3 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-all"
        >
          {current === lesson.toneQuestions.length - 1 ? "Lihat Hasil ›" : "Selanjutnya ›"}
        </button>
      )}
    </div>
  );
}
