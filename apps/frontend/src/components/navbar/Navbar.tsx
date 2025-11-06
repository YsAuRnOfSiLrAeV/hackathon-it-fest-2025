"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { logo } from "@/../public";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    return (
        <header className="fixed inset-x-0 top-0 z-50 w-full bg-amber-50">
            <div className="flex w-full h-16 items-center justify-between px-7 sm:px-8 lg:px-10">
                <Link href="/" className="flex items-center gap-2">
                    <Image src={logo} alt="CareerPilot" className="rounded w-8 h-8 lg:w-10 lg:h-10" />
                    <span className="text-base font-semibold tracking-tight text-blue-600 sm:text-lg lg:text-xl">CareerPilot</span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden items-center gap-4 text-sm sm:gap-6 sm:text-base lg:flex">
                    <Link href="/" className="text-zinc-800 hover:text-zinc-950 text-lg">Home</Link>
                    <Link href="/cv" className="text-zinc-800 hover:text-zinc-950 text-lg">Generator</Link>
                    <Link href="/interview" className="text-zinc-800 hover:text-zinc-950 text-lg">Interview</Link>
                    <Link href="/profile" className="text-zinc-800 hover:text-zinc-950 text-lg">Profile</Link>
                </nav>

                {/* Burger for tablets and down */}
                <button
                    aria-label="Open menu"
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    className="inline-flex items-center justify-center rounded-md py-2 text-zinc-800 hover:bg-zinc-100 lg:hidden"
                    onClick={() => setOpen((v) => !v)}
                >
                    <span className="sr-only">Menu</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>
            </div>

            {/* Mobile/Tablet panel */}
            <div
                id="mobile-menu"
                className={`w-full border-t border-zinc-200 bg-amber-50 lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${open ? "max-h-64 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}
                aria-hidden={!open}
            >
                <div className="mx-auto flex max-w-md justify-end px-7 py-3 text-base sm:max-w-2xl md:max-w-3xl">
                    <nav className="flex flex-col items-end gap-2 text-right">
                        <Link href="/" className="py-2 text-zinc-800 hover:text-zinc-950 text-lg" onClick={() => setOpen(false)}>Home</Link>
                        <Link href="/cv" className="py-2 text-zinc-800 hover:text-zinc-950 text-lg" onClick={() => setOpen(false)}>Generator</Link>
                        <Link href="/interview" className="py-2 text-zinc-800 hover:text-zinc-950 text-lg" onClick={() => setOpen(false)}>Interview</Link>
                        <Link href="/profile" className="py-2 text-zinc-800 hover:text-zinc-950 text-lg" onClick={() => setOpen(false)}>Profile</Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}

