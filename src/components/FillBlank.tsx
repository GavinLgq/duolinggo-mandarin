"use client";

import { useState } from "react";
import { Lesson } from "@/data/lessons";
import { useProgress } from "@/context/ProgressContext";

export default function FillBlank({ lesson }: { lesson: Lesson }) {
  const { updateFillBlank, getLessonProgress } = useProgress();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<(boolean | null)[]>(new Array(lesson.fillBlanks.length).fill(null));
  const [finished, setFinished] = useState(false);
  const prog = getLessonProgress(lesson.id);

  const question = lesson.fillBlanks[current];

  const handleSelect = (option: string) => {
    if (selected !== null) return;
    setSelected(option);
    const correct = option === question.answer;
    const updated = [...answers];
    updated[current] = correct;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (current < lesson.fillBlanks.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      const score = answers.filter(Boolean).length;
      updateFillBlank(lesson.id, score, lesson.fillBlanks.length);
      setFinished(true);
    }
  };

  const reset = () => {
    setCurrent(0);
    setSelected(null);
    setAnswers(new Array(lesson.fillBlanks.length).fill(null));
    setFinished(false);
  };

  if (finished) {
    const score = answers.filter(Boolean).length;
    const total = lesson.fillBlanks.length;
    const pct = Math.round((score / total) * 100);
    return (
      <div className="text-center py-6">
        <div className="text-6xl mb-4">{pct === 100 ? "🏆" : pct >= 70 ? "🎉" : "📖"}</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{score} / {total} Benar</h3>
        <p className="text-gray-500 mb-6">{pct}% tepat</p>
        <div className="space-y-3 mb-6 text-left">
          {lesson.fillBlanks.map((q, i) => (
            <div key={q.id} className={`rounded-xl p-4 text-sm ${answers[i] ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
              <div className="font-semibold text-gray-900 mb-1">{q.sentence.replace("___", `[${q.answer}]`)}</div>
              <div className="text-gray-500 italic text-xs">{q.meaning.replace("___", q.answer)}</div>
              <div className={`text-xs font-medium mt-1 ${answers[i] ? "text-green-600" : "text-red-500"}`}>
                {answers[i] ? "✓ Benar" : `✗ Jawaban benar: ${q.answer}`}
              </div>
            </div>
          ))}
        </div>
        <button onClick={reset} className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-all">
          Ulangi Latihan
        </button>
        {prog.fillBlankScore !== null && (
          <p className="mt-4 text-xs text-gray-400">Skor tersimpan: {prog.fillBlankScore}/{prog.fillBlankTotal}</p>
        )}
      </div>
    );
  }

  const displaySentence = (sentence: string, answer?: string) => {
    const parts = sentence.split("___");
    if (parts.length < 2) return <span>{sentence}</span>;
    return (
      <>
        {parts[0]}
        <span className={`inline-block min-w-[60px] border-b-2 text-center font-bold mx-1 ${answer ? "border-green-500 text-green-700" : "border-red-500 text-red-600"}`}>
          {answer || "___"}
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <div>
      {/* Instructions */}
      <div className="bg-purple-50 border border-purple-100 rounded-xl p-3 mb-4 text-sm text-purple-700">
        <span className="font-medium">✏️ Latihan Mengisi Kata:</span> Pilih kata yang tepat untuk melengkapi kalimat.
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex gap-1 flex-1">
          {lesson.fillBlanks.map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full ${i < current ? (answers[i] ? "bg-green-400" : "bg-red-400") : i === current ? "bg-red-600" : "bg-gray-200"}`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-500 whitespace-nowrap">{current + 1}/{lesson.fillBlanks.length}</span>
      </div>

      {/* Question card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
        <p className="text-sm text-gray-400 mb-3">Lengkapi kalimat berikut:</p>
        <div className="text-xl font-semibold text-gray-900 mb-2 leading-relaxed">
          {displaySentence(question.sentence, selected === question.answer ? question.answer : selected && selected !== question.answer ? selected : undefined)}
        </div>
        <div className="text-sm text-gray-400 italic">
          {displaySentence(question.meaning)}
        </div>
        {question.pinyin && (
          <div className="text-sm text-red-400 mt-1">
            {question.pinyin.replace("___", selected || "___")}
          </div>
        )}
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
              className={`border-2 rounded-xl p-4 text-center font-bold text-xl transition-all ${style}`}
            >
              {opt}
              {selected !== null && isCorrect && <span className="text-green-500 ml-2 text-base">✓</span>}
              {selected !== null && isSelected && !isCorrect && <span className="text-red-500 ml-2 text-base">✗</span>}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {selected && (
        <div className={`rounded-xl p-3 mb-4 text-sm font-medium ${selected === question.answer ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {selected === question.answer
            ? "🎉 Benar! Bagus sekali!"
            : `❌ Salah. Jawaban benar: "${question.answer}"`}
        </div>
      )}

      {selected && (
        <button
          onClick={handleNext}
          className="w-full py-3 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-all"
        >
          {current === lesson.fillBlanks.length - 1 ? "Lihat Hasil ›" : "Selanjutnya ›"}
        </button>
      )}
    </div>
  );
}
