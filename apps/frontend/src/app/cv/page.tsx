"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { SectionWrapper, Input, Textarea, TemplateA, TemplateB } from "@/components";

type CvData = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  summary: string;
  skills: string;
  education: string;
  experience: string;
  projects: string;
};

const BACKEND = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8081";

const EMPTY: CvData = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  github: "",
  linkedin: "",
  summary: "",
  skills: "",
  education: "",
  experience: "",
  projects: "",
};

const STORAGE_KEY = "cv-draft-v1";

export default function CvPage() {
  const [data, setData] = useState<CvData>(EMPTY);
  const [template, setTemplate] = useState<"a" | "b">("a");
  const previewRef = useRef<HTMLDivElement>(null);

  // Load draft from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setData({ ...EMPTY, ...JSON.parse(raw) });
    } catch {}
  }, []);

  // Derived lists
  const skillsList = useMemo(() =>
    data.skills
      .split(/\n|,/)
      .map((s) => s.trim())
      .filter(Boolean),
  [data.skills]);

  function handleChange<K extends keyof CvData>(key: K, value: CvData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function saveDraft() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function clearDraft() {
    localStorage.removeItem(STORAGE_KEY);
    setData(EMPTY);
  }

  async function loadCurrent() {
    try {
      const res = await fetch(`${BACKEND}/api/cv`, { credentials: "include" });
      if (res.status === 401) {
        window.location.href = `${BACKEND}/oauth2/authorization/google`;
        return;
      }
      if (!res.ok) throw new Error(`Failed to load CV: ${res.status}`);
      const dto = await res.json();
      setData({ ...EMPTY, ...dto });
    } catch {}
  }

  async function markAsCurrent() {
    try {
      const res = await fetch(`${BACKEND}/api/cv`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 401) {
        window.location.href = `${BACKEND}/oauth2/authorization/google`;
        return;
      }
      if (!res.ok) throw new Error(`Failed to save CV: ${res.status}`);
      const dto = await res.json();
      setData({ ...EMPTY, ...dto });
    } catch {}
  }

  async function exportPdf() {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
    if (template === "a") {
      renderTemplateAPdf(doc, data, skillsList);
    } else {
      renderTemplateBPdf(doc, data, skillsList);
    }
    const fileName = `CV_${(data.fullName || "resume").replace(/[^a-z0-9-_]+/gi, "_")}.pdf`;
    doc.save(fileName);
  }

  type PdfTextOptions = { align?: "left" | "center" | "right" };
  type PdfDoc = {
    setFont: (family: string, style?: string) => void;
    setFontSize: (size: number) => void;
    text: (text: string | string[], x: number, y: number, options?: PdfTextOptions) => void;
    splitTextToSize: (text: string, size: number) => string[];
  };

  function renderTemplateAPdf(doc: PdfDoc, d: CvData, skills: string[]) {
    const left = 12;
    let y = 16;
    const line = (t: string, size = 14, bold = false) => {
      doc.setFont("helvetica", bold ? "bold" : "normal");
      doc.setFontSize(size);
      doc.text(t, left, y);
      y += 6;
    };
    const block = (title: string, txt: string) => {
      line(title, 15, true);
      const wrapped = doc.splitTextToSize(txt || "", 180);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(14);
      doc.text(wrapped, left, y);
      y += (wrapped.length || 1) * 5 + 8;
    };

    line(d.fullName || "Your Name", 27, true);
    y += 4;
    doc.setFontSize(14);
    line([d.location, d.email, d.phone].filter(Boolean).join(" · "));
    line([d.website, d.github, d.linkedin].filter(Boolean).join(" · "));
    y += 10;

    block("Summary", d.summary);
    block("Skills", skills.join(", "));
    block("Experience", d.experience);
    block("Projects", d.projects);
    block("Education", d.education);
  }

  function renderTemplateBPdf(doc: PdfDoc, d: CvData, skills: string[]) {
    const pageWidth = 210;
    const margin = 12;
    const contentWidth = pageWidth - margin * 2;
    const leftColWidth = (contentWidth * 2) / 3;
    const rightColWidth = contentWidth - leftColWidth;
    let y = 16;

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(27);
    doc.text(d.fullName || "Your Name", margin, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text([d.email, d.phone].filter(Boolean).join(" | "), margin + leftColWidth + 4, y, { align: "left" });
    y += 8;
    doc.text([d.location, d.website, d.github, d.linkedin].filter(Boolean).join(" · "), margin, y);
    y += 14;

    // Two-column layout
    const leftX = margin;
    const rightX = margin + leftColWidth + 6;
    const startY = y;

    // Left column
    let yLeft = startY;
    const tbLeft = (title: string, txt: string) => {
      doc.setFont("helvetica", "bold"); doc.setFontSize(15); doc.text(title, leftX, yLeft); yLeft += 6;
      doc.setFont("helvetica", "normal"); doc.setFontSize(14);
      const wrapped = doc.splitTextToSize(txt || "", leftColWidth);
      doc.text(wrapped, leftX, yLeft); yLeft += (wrapped.length || 1) * 5 + 6;
    };
    tbLeft("Experience", d.experience);
    tbLeft("Projects", d.projects);

    // Right column
    let yRight = startY;
    const tbRight = (title: string, txt: string) => {
      doc.setFont("helvetica", "bold"); doc.setFontSize(15); doc.text(title, rightX, yRight); yRight += 6;
      doc.setFont("helvetica", "normal"); doc.setFontSize(14);
      const wrapped = doc.splitTextToSize(txt || "", rightColWidth);
      doc.text(wrapped, rightX, yRight); yRight += (wrapped.length || 1) * 5 + 6;
    };
    tbRight("Summary", d.summary);
    tbRight("Skills", skills.join(", "));
    tbRight("Education", d.education);
  }

  return (
    <SectionWrapper id="cv">
      <main className="pt-20 text-zinc-900">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
          {/* Form */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">CV Generator</h2>
            <div className="flex flex-wrap gap-3">
              <button onClick={loadCurrent} className="rounded-full border border-zinc-900 px-4 py-1.5 text-zinc-900 hover:bg-zinc-900 hover:text-white hover:cursor-pointer">Load current CV</button>
              <button type="button" className="rounded-full border border-blue-600 px-4 py-1.5 text-blue-600 hover:bg-blue-600 hover:text-white hover:cursor-pointer">Generate with AI</button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Input label="Full name" value={data.fullName} onChange={(v) => handleChange("fullName", v)} required />
              <Input label="Email" type="email" value={data.email} onChange={(v) => handleChange("email", v)} required />
              <Input label="Phone" value={data.phone} onChange={(v) => handleChange("phone", v)} />
              <Input label="Location" value={data.location} onChange={(v) => handleChange("location", v)} />
              <Input label="Website" value={data.website} onChange={(v) => handleChange("website", v)} />
              <Input label="GitHub" value={data.github} onChange={(v) => handleChange("github", v)} />
              <Input label="LinkedIn" value={data.linkedin} onChange={(v) => handleChange("linkedin", v)} />
            </div>

            <Textarea label="Summary" rows={4} value={data.summary} onChange={(v) => handleChange("summary", v)} />
            <Textarea label="Skills (comma or newline separated)" rows={3} value={data.skills} onChange={(v) => handleChange("skills", v)} />
            <Textarea label="Experience" rows={5} value={data.experience} onChange={(v) => handleChange("experience", v)} />
            <Textarea label="Projects" rows={5} value={data.projects} onChange={(v) => handleChange("projects", v)} />
            <Textarea label="Education" rows={4} value={data.education} onChange={(v) => handleChange("education", v)} />

            <div className="flex flex-wrap gap-3 pt-2">
              <button onClick={saveDraft} className="rounded-full bg-zinc-900 px-5 py-2 text-white hover:text-blue-400 hover:cursor-pointer">Save draft</button>
              <button onClick={clearDraft} className="rounded-full border border-zinc-900 px-5 py-2 text-zinc-900 hover:bg-zinc-900 hover:text-white hover:cursor-pointer">Clear</button>
              <button onClick={exportPdf} className="rounded-full bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 hover:cursor-pointer">Export PDF</button>
              <button onClick={markAsCurrent} className="rounded-full border border-blue-600 px-5 py-2 text-blue-600 hover:bg-blue-600 hover:text-white hover:cursor-pointer">Mark as current CV</button>
            </div>

            <div className="pt-4 text-sm text-zinc-600">
              <span className="mr-3 font-medium">Preview template:</span>
              <label className="mr-4 inline-flex items-center gap-2 hover:cursor-pointer">
                <input type="radio" name="tpl" checked={template === "a"} onChange={() => setTemplate("a")} />
                A
              </label>
              <label className="inline-flex items-center gap-2 hover:cursor-pointer">
                <input type="radio" name="tpl" checked={template === "b"} onChange={() => setTemplate("b")} />
                B
              </label>
            </div>
          </section>

          {/* Preview */}
          <section ref={previewRef} className="min-w-0 overflow-hidden rounded-2xl bg-[#ffffff] p-5 border border-[#e5e7eb] sm:p-6 lg:p-7">
            {template === "a" ? <TemplateA data={data} skills={skillsList} /> : <TemplateB data={data} skills={skillsList} />}
          </section>
        </div>
      </main>
    </SectionWrapper>
  );
}