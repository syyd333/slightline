"use client";

import { useEffect, useState } from "react";
import { SetupNotice } from "@/components/SetupNotice";
import { rankClips } from "@/lib/search";
import { seedIfEmpty } from "@/lib/seed";
import { supabase } from "@/lib/supabase";
import type { Camera, Clip } from "@/lib/types";

export default function SearchPage() {
  const [query, setQuery] = useState("person in a red jacket");
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [clips, setClips] = useState<Clip[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [ran, setRan] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await seedIfEmpty();
        const [c, v] = await Promise.all([
          supabase.from("cameras").select("*"),
          supabase.from("clips").select("*").order("captured_at", { ascending: false }),
        ]);
        setCameras((c.data as Camera[]) ?? []);
        setClips((v.data as Clip[]) ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not load clips.");
      }
    })();
  }, []);

  const results = ran ? rankClips(query, clips, cameras) : [];

  const search = async (event: React.FormEvent) => {
    event.preventDefault();
    setRan(true);
    const ranked = rankClips(query, clips, cameras);
    await supabase.from("search_logs").insert({ query, results_count: ranked.length });
    await supabase.from("access_logs").insert({ action: "search", resource: query });
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--mute)]">Module 2</p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl">Footage finder</h1>
      <p className="mt-3 text-sm leading-6 text-[var(--mute)]">
        Natural-language search over clothing colour and vehicle type. Faces are never matched.
      </p>

      <form onSubmit={search} className="mt-8 flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 rounded-full border border-[var(--line)] bg-[var(--paper)] px-5 py-3 text-sm"
          placeholder="white motorcycle, yellow auto, black hoodie…"
        />
        <button className="rounded-full bg-[var(--ink)] px-5 py-3 text-sm text-[var(--paper)]">Search</button>
      </form>

      {error && <div className="mt-6"><SetupNotice message={error} /></div>}

      <div className="mt-8 space-y-4">
        {ran && results.length === 0 && (
          <p className="text-sm text-[var(--mute)]">No ranked clips. Try another description.</p>
        )}
        {results.map(({ clip, camera, score }) => (
          <article key={clip.id} className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-sm font-medium">{camera?.name ?? "Unlinked camera"}</h2>
              <span className="text-xs text-[var(--mute)]">score {score.toFixed(1)}</span>
            </div>
            <p className="mt-2 text-sm leading-6">{clip.description}</p>
            <p className="mt-3 text-xs uppercase tracking-wide text-[var(--mute)]">
              {new Date(clip.captured_at).toLocaleString("en-IN")} · {clip.tags.join(" · ")}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
