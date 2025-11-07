"use client";

import { useEffect, useMemo, useState } from "react";

type ProfileDto = {
  id: number;
  email: string;
  name: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  websiteUrl?: string | null;
  bio?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

type ProfileUpdateDto = {
  name: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  websiteUrl?: string | null;
  bio?: string | null;
};

const BACKEND = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8081";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requiresLogin, setRequiresLogin] = useState(false);
  const [profile, setProfile] = useState<ProfileDto | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [name, setName] = useState<string>("");
  const [githubUrl, setGithubUrl] = useState<string>("");
  const [linkedinUrl, setLinkedinUrl] = useState<string>("");
  const [websiteUrl, setWebsiteUrl] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  const hasChanges = useMemo(() => {
    if (!profile) return false;
    return (
      (profile.name ?? "") !== name ||
      (profile.githubUrl ?? "") !== githubUrl ||
      (profile.linkedinUrl ?? "") !== linkedinUrl ||
      (profile.websiteUrl ?? "") !== websiteUrl ||
      (profile.bio ?? "") !== bio
    );
  }, [profile, name, githubUrl, linkedinUrl, websiteUrl, bio]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(`${BACKEND}/api/profile`, { credentials: "include" })
      .then(async (r) => {
        if (r.status === 401) {
          if (!cancelled) {
            setRequiresLogin(true);
            setLoading(false);
            window.location.href = `${BACKEND}/oauth2/authorization/google`;
          }
          return;
        }
        if (!r.ok) throw new Error(`Failed to load profile: ${r.status}`);
        const data: ProfileDto = await r.json();
        if (!cancelled) {
          setProfile(data);
          setName(data.name ?? "");
          setGithubUrl(data.githubUrl ?? "");
          setLinkedinUrl(data.linkedinUrl ?? "");
          setWebsiteUrl(data.websiteUrl ?? "");
          setBio(data.bio ?? "");
          setLoading(false);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e.message || "Unexpected error");
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const validateUrl = (value: string) => {
    if (!value) return true;
    try {
      const u = new URL(value);
      return !!u.protocol && !!u.host;
    } catch {
      return false;
    }
  };

  const onSave = async () => {
    setError(null);
    if (!validateUrl(githubUrl) || !validateUrl(linkedinUrl) || !validateUrl(websiteUrl)) {
      setError("Please enter valid URLs (including protocol, e.g., https://example.com)");
      return;
    }
    const dto: ProfileUpdateDto = {
      name: name || null,
      githubUrl: githubUrl || null,
      linkedinUrl: linkedinUrl || null,
      websiteUrl: websiteUrl || null,
      bio: bio || null,
    };
    try {
      setSaving(true);
      const res = await fetch(`${BACKEND}/api/profile`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto),
      });
      if (res.status === 401) {
        setRequiresLogin(true);
        return;
      }
      if (!res.ok) throw new Error(`Save failed: ${res.status}`);
      const updated: ProfileDto = await res.json();
      setProfile(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg || "Unexpected error while saving");
    } finally {
      setSaving(false);
    }
  };

  const onLogin = () => {
    window.location.href = `${BACKEND}/oauth2/authorization/google`;
  };

  const onLogout = () => {
    window.location.href = `${BACKEND}/logout`;
  };

  const onDelete = async () => {
    const ok = window.confirm("Delete all your data (profile and CV)? This cannot be undone.");
    if (!ok) return;
    try {
      const res = await fetch(`${BACKEND}/api/account`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.status === 401) {
        window.location.href = `${BACKEND}/oauth2/authorization/google`;
        return;
      }
      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);

      try {
        localStorage.removeItem("cv-draft-v1");
        localStorage.removeItem("cv-current-v1");
        localStorage.removeItem("interview-history-v1");
      } catch {}

      window.location.href = `${BACKEND}/logout`;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg || "Unexpected error while deleting");
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold">Profile</h1>

      {loading && (
        <div className="mt-6 text-zinc-700">Loading…</div>
      )}

      {!loading && error && !requiresLogin && !profile && (
        <div className="mt-6 rounded-2xl bg-white p-5 ring-1 ring-red-200">
          <div className="text-sm text-red-700">{error}</div>
          <div className="mt-3">
            <button onClick={() => window.location.reload()} className="rounded-full border border-red-700 px-4 py-1.5 text-red-700 hover:bg-red-700 hover:text-white">Retry</button>
          </div>
        </div>
      )}

      {!loading && requiresLogin && (
        <div className="mt-6 rounded-2xl bg-white p-5 ring-1 ring-zinc-200">
          <div className="text-zinc-800">You need to log in to view your profile.</div>
          <div className="mt-4 flex gap-3">
            <button onClick={onLogin} className="rounded-full bg-zinc-900 px-5 py-2 text-white hover:bg-zinc-800">Login with Google</button>
          </div>
        </div>
      )}

      {!loading && !requiresLogin && profile && (
        <section className="mt-6 space-y-5">
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-200">{error}</div>
          )}
          <div className="rounded-2xl bg-white p-5 ring-1 ring-zinc-200">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium text-zinc-700">Email</label>
                <input value={profile.email} disabled className="mt-1 w-full rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-sm text-zinc-800" />
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-700">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-800" />
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-700">GitHub URL</label>
                <input value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} placeholder="https://github.com/username" className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-800" />
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-700">LinkedIn URL</label>
                <input value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} placeholder="https://www.linkedin.com/in/username" className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-800" />
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-700">Website URL</label>
                <input value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} placeholder="https://example.com" className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-800" />
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-700">Bio</label>
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={5} placeholder="Short bio…" className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-800" />
              </div>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <button onClick={onSave} disabled={!hasChanges || saving} className="rounded-full bg-zinc-900 px-5 py-2 text-white hover:bg-zinc-800 disabled:opacity-50 hover:cursor-pointer disabled:cursor-not-allowed disabled:hover:cursor-not-allowed">{saving ? "Saving…" : "Save changes"}</button>
              <button onClick={onLogout} className="rounded-full border border-zinc-900 px-5 py-2 text-zinc-900 hover:bg-zinc-900 hover:text-white hover:cursor-pointer">Logout</button>
              <button onClick={onDelete} className="ml-auto rounded-full bg-[#f85d5d] px-5 py-2 text-white hover:bg-red-700 hover:cursor-pointer">Delete all data</button>
              {saved && <span className="text-sm text-zinc-600">Saved</span>}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}