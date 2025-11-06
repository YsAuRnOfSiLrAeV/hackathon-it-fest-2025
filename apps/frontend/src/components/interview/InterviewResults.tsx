"use client";

import { useState } from "react";
type Question = {
  id: string;
  text: string;
  choices: string[];
  correct: number;
};

type InterviewResultsProps = {
  total: number;
  answers: number[];
  quiz: Question[];
  secondsUsed: number;
  onRestart: () => void;
};

function InterviewResults({ total, answers, quiz, secondsUsed, onRestart }: InterviewResultsProps) {
  const [saved, setSaved] = useState<boolean>(false);
  let correct = 0;
  const checklist: string[] = [];
  for (let i = 0; i < total; i++) {
    if (answers[i] === quiz[i].correct) correct++;
    else checklist.push(quiz[i].text);
  }
  const score = Math.round((correct / total) * 100);

  const saveResult = () => {
    const STORAGE_KEY = "interview-history-v1";
    const attempt = {
      finishedAt: new Date().toISOString(),
      durationSec: secondsUsed,
      score,
      total,
      correct,
      answers,
      quizIds: quiz.map((q) => q.id),
      checklist,
    };
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list = raw ? JSON.parse(raw) : [];
      list.unshift(attempt);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 10)));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {}
  };
  return (
    <section className="mx-auto max-w-3xl space-y-5">
      <h2 className="text-2xl font-bold">Results</h2>
      <div className="rounded-2xl bg-white p-5 ring-1 ring-zinc-200">
        <div className="text-lg font-semibold">Score: {score} / 100</div>
        <div className="text-sm text-zinc-600">Correct {correct} of {total} • Time {Math.floor(secondsUsed / 60)}:{String(secondsUsed % 60).padStart(2, "0")}</div>
        <div className="mt-4">
          <h3 className="font-semibold">Checklist to review</h3>
          {checklist.length === 0 ? (
            <div className="text-sm text-zinc-700">Great job! No items to review.</div>
          ) : (
            <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700">
              {checklist.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={onRestart} className="rounded-full border border-zinc-900 px-5 py-2 text-zinc-900 hover:bg-zinc-900 hover:text-white">Restart</button>
        <button onClick={saveResult} className="rounded-full bg-zinc-900 px-5 py-2 text-white hover:bg-zinc-800">Save result (local)</button>
        {saved && <span className="text-sm text-zinc-600">Saved</span>}
      </div>
    </section>
  );
}

export default InterviewResults;