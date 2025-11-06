"use client";
import Link from "next/link";
import { SectionWrapper, CardHome } from "@/components";
import { useState } from "react";
import { cards } from "@/constants";

export default function Home() {
  const [curOpen, setCurOpen] = useState(-1);

  return (
    <SectionWrapper id="home">
      <main className="text-zinc-900">
        <div className="flex flex-col">
          <header className="mt-6 sm:mt-8">
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:mt-4 sm:text-4xl md:text-5xl/14 lg:text-6xl/18">
              Build a strong CV and get ready for interviews with CareerPilot
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-700 sm:text-lg md:text-xl">
              Generate a polished resume in a few steps, practice answering interview questions,
              and save your results - all in one place.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/cv"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-white transition-colors hover:text-blue-400 sm:w-auto"
              >
                Create CV
              </Link>
              <Link
                href="/interview"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-zinc-900 px-6 py-3 text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-white sm:w-auto"
              >
                Start Interview Practice
              </Link>
            </div>
          </header>

          <section className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:mt-16 xl:grid-cols-4 xl:gap-8">
            {cards.map((c, i) => (
              <CardHome
                key={c.name}
                num={i}
                curOpen={curOpen}
                onCurOpen={setCurOpen}
                name={c.name}
                description={c.description}
                skills={c.skills}
              />
            ))}
          </section>
        </div>
      </main>
    </SectionWrapper>
  );
}
