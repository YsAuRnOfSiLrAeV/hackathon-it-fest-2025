"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SectionWrapper, InterviewResults } from "@/components";
import { interviewQuestions } from "@/constants";

type Question = {
  id: string;
  text: string;
  choices: string[];
  correct: number;
};

type Attempt = {
  startedAt: string;
  finishedAt: string;
  durationSec: number;
  score: number;
  total: number;
  selfScore?: number;
  checklist: string[];
};

const QUESTIONS: Question[] = interviewQuestions;

const STORAGE_KEY = "interview-history-v1";

export default function InterviewPage() {
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const [durationMin, setDurationMin] = useState(5);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const startedAtRef = useRef<string>("");

  const quiz = useMemo(() => QUESTIONS.slice(0, 6), []);
  const total = quiz.length;

  const scoreAttempt = useCallback((a: number[]): { scorePct: number; checklist: string[] } => {
    let correct = 0;
    const checklist: string[] = [];
    for (let i = 0; i < total; i++) {
      if (a[i] === quiz[i].correct) correct++;
      else checklist.push(`Review: ${quiz[i].text}`);
    }
    return { scorePct: Math.round((correct / total) * 100), checklist };
  }, [quiz, total]);

  const saveHistory = useCallback((attempt: Attempt) => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list: Attempt[] = raw ? JSON.parse(raw) : [];
      list.unshift(attempt);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 10)));
    } catch {}
  }, []);

  const handleSubmit = useCallback(() => {
    const finishedAt = new Date().toISOString();
    const { scorePct, checklist } = scoreAttempt(answers);
    const attempt: Attempt = {
      startedAt: startedAtRef.current,
      finishedAt,
      durationSec: durationMin * 60 - secondsLeft,
      score: scorePct,
      total,
      checklist,
    };
    saveHistory(attempt);
    setPhase("done");
  }, [answers, durationMin, secondsLeft, total, scoreAttempt, saveHistory]);

  useEffect(() => {
    if (phase !== "running") return;
    const t = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(t);
          handleSubmit();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [phase, durationMin, handleSubmit]);

  function start() {
    setIndex(0);
    setAnswers(Array(total).fill(-1));
    startedAtRef.current = new Date().toISOString();
    setSecondsLeft(durationMin * 60);
    setPhase("running");
  }

  function selectChoice(qi: number, choice: number) {
    setAnswers((a) => {
      const b = [...a];
      b[qi] = choice;
      return b;
    });
  }



  return (
    <SectionWrapper id="interview">
      <main className="pt-20 text-zinc-900">
        {phase === "idle" && (
          <section className="mx-auto max-w-3xl space-y-5">
            <h1 className="text-2xl font-bold">Interview Simulator</h1>
            <p className="text-zinc-700">Answer 6 questions under time. You’ll get a score and a short checklist.</p>
            <div className="flex items-center gap-3">
              <label className="text-sm text-zinc-700">Duration:</label>
              <select
                value={durationMin}
                onChange={(e) => setDurationMin(Number(e.target.value))}
                className="rounded-lg border border-zinc-300 bg-white px-3 py-2"
              >
                <option value={5}>5 min</option>
                <option value={8}>8 min</option>
                <option value={10}>10 min</option>
              </select>
            </div>
            <button onClick={start} className="rounded-full bg-zinc-900 px-5 py-2 text-white hover:bg-zinc-800">Start</button>
          </section>
        )}

        {phase === "running" && (
          <section className="mx-auto max-w-3xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm text-zinc-600">Question {index + 1} / {total}</div>
              <div className="rounded-full bg-zinc-900 px-3 py-1 text-sm text-white">{Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, "0")}</div>
            </div>
            <div className="rounded-2xl bg-white p-5 ring-1 ring-zinc-200">
              <h2 className="text-lg font-semibold">{quiz[index].text}</h2>
              <div className="mt-4 grid grid-cols-1 gap-3">
                {quiz[index].choices.map((c, i) => (
                  <label key={i} className="flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-300 bg-white px-3 py-2 hover:border-zinc-500">
                    <input
                      type="radio"
                      name={`q-${index}`}
                      checked={answers[index] === i}
                      onChange={() => selectChoice(index, i)}
                    />
                    <span>{c}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                className="rounded-full border border-zinc-900 px-4 py-2 text-zinc-900 hover:bg-zinc-900 hover:text-white"
              >
                Prev
              </button>
              {index < total - 1 ? (
                <button
                  onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}
                  className="rounded-full bg-zinc-900 px-5 py-2 text-white hover:bg-zinc-800"
                >
                  Next
                </button>
              ) : (
                <button onClick={handleSubmit} className="rounded-full bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">Finish</button>
              )}
            </div>
          </section>
        )}

        {phase === "done" && (
          <InterviewResults total={total} answers={answers} quiz={quiz} secondsUsed={durationMin * 60 - secondsLeft} onRestart={() => setPhase("idle")} />)
        }
      </main>
    </SectionWrapper>
  );
}