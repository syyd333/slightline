"use client";

import { useEffect, useState } from "react";
import { SetupNotice } from "@/components/SetupNotice";
import { seedIfEmpty } from "@/lib/seed";
import { supabase } from "@/lib/supabase";
import type { Incident } from "@/lib/types";

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    const { data, error: loadError } = await supabase
      .from("incidents")
      .select("*")
      .order("occurred_at", { ascending: false });
    if (loadError) throw loadError;
    setIncidents((data as Incident[]) ?? []);
  };

  useEffect(() => {
    (async () => {
      try {
        await seedIfEmpty();
        await load();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not load incidents.");
      }
    })();
  }, []);

  const add = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim()) return;
    const { error: insertError } = await supabase.from("incidents").insert({
      title,
      lat: 17.31 + Math.random() * 0.002,
      lng: 78.404 + Math.random() * 0.002,
      severity: 3,
      has_evidence: false,
      notes: "Logged without footage — feeds the next planner round.",
    });
    if (insertError) {
      setError(insertError.message);
      return;
    }
    await supabase.from("access_logs").insert({ action: "create", resource: title });
    setTitle("");
    await load();
  };

  const toggleEvidence = async (incident: Incident) => {
    await supabase.from("incidents").update({ has_evidence: !incident.has_evidence }).eq("id", incident.id);
    await load();
  };

  const gaps = incidents.filter((i) => !i.has_evidence).length;

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--mute)]">Feedback loop</p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl">Incidents</h1>
      <p className="mt-3 text-sm leading-6 text-[var(--mute)]">
        {gaps} with no evidence. Those locations get extra weight the next time you run the planner.
      </p>

      <form onSubmit={add} className="mt-8 flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New no-evidence incident"
          className="flex-1 rounded-full border border-[var(--line)] bg-[var(--paper)] px-5 py-3 text-sm"
        />
        <button className="rounded-full bg-[var(--ink)] px-5 py-3 text-sm text-[var(--paper)]">Log gap</button>
      </form>

      {error && <div className="mt-6"><SetupNotice message={error} /></div>}

      <div className="mt-8 space-y-3">
        {incidents.map((incident) => (
          <article key={incident.id} className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-sm font-medium">{incident.title}</h2>
                <p className="mt-1 text-xs text-[var(--mute)]">
                  {new Date(incident.occurred_at).toLocaleString("en-IN")} · severity {incident.severity}
                </p>
                {incident.notes && <p className="mt-2 text-sm leading-6 text-[var(--mute)]">{incident.notes}</p>}
              </div>
              <button
                onClick={() => toggleEvidence(incident)}
                className="shrink-0 rounded-full border border-[var(--line)] px-3 py-1 text-xs"
              >
                {incident.has_evidence ? "Has evidence" : "No evidence"}
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
