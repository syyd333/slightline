"use client";

import { useEffect, useMemo, useState } from "react";
import { DynamicMap } from "@/components/DynamicMap";
import { SetupNotice } from "@/components/SetupNotice";
import { planPlacements } from "@/lib/planner";
import { seedIfEmpty } from "@/lib/seed";
import { supabase } from "@/lib/supabase";
import type { Camera, CandidateSite, Incident, PlannedSite } from "@/lib/types";

export default function PlannerPage() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [sites, setSites] = useState<CandidateSite[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [budget, setBudget] = useState(80000);
  const [selected, setSelected] = useState<PlannedSite[]>([]);
  const [coverage, setCoverage] = useState(0);
  const [warning, setWarning] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await seedIfEmpty();
        const [c, s, i] = await Promise.all([
          supabase.from("cameras").select("*"),
          supabase.from("candidate_sites").select("*"),
          supabase.from("incidents").select("*"),
        ]);
        setCameras((c.data as Camera[]) ?? []);
        setSites((s.data as CandidateSite[]) ?? []);
        setIncidents((i.data as Incident[]) ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not load planner data.");
      }
    })();
  }, []);

  const run = () => {
    const result = planPlacements(sites, cameras, incidents, budget);
    setSelected(result.selected);
    setCoverage(result.coverageScore);
    setWarning(result.fairnessWarning);
    setSaved(false);
  };

  const save = async () => {
    const { error: saveError } = await supabase.from("placement_plans").insert({
      budget,
      selected,
      coverage_score: coverage,
      fairness_warning: warning,
    });
    if (saveError) {
      setError(saveError.message);
      return;
    }
    await supabase.from("access_logs").insert({ action: "plan", resource: `budget ${budget}` });
    setSaved(true);
  };

  const selectedIds = useMemo(() => selected.map((s) => s.id), [selected]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--mute)]">Module 1</p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl">Placement planner</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--mute)]">
        Uses incident weight — no-evidence cases count more — then spends the budget on OSM candidate sites.
      </p>

      <div className="mt-8 flex flex-wrap items-end gap-4">
        <label className="text-sm">
          Budget (₹)
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="mt-1 block w-40 rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3 py-2"
          />
        </label>
        <button onClick={run} className="rounded-full bg-[var(--ink)] px-5 py-2.5 text-sm text-[var(--paper)]">
          Run optimiser
        </button>
        {selected.length > 0 && (
          <button onClick={save} className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-5 py-2.5 text-sm">
            {saved ? "Saved" : "Save plan"}
          </button>
        )}
        <p className="text-sm text-[var(--mute)]">Coverage of known incidents: {coverage}%</p>
      </div>

      {warning && (
        <p className="mt-4 rounded-xl bg-[var(--accent-soft)] px-4 py-3 text-sm text-[var(--accent)]">{warning}</p>
      )}
      {error && <div className="mt-4"><SetupNotice message={error} /></div>}

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
        <div className="h-[480px] overflow-hidden rounded-2xl border border-[var(--line)]">
          <DynamicMap
            cameras={cameras}
            incidents={incidents}
            sites={sites}
            selectedIds={selectedIds}
            autoFit={false}
          />
        </div>
        <div className="space-y-3">
          {(selected.length ? selected : []).map((site) => (
            <article key={site.id} className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4">
              <div className="flex justify-between text-sm">
                <h2 className="font-medium">{site.name}</h2>
                <span>₹{site.cost.toLocaleString("en-IN")}</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-[var(--mute)]">{site.justification}</p>
            </article>
          ))}
          {selected.length === 0 && (
            <p className="text-sm text-[var(--mute)]">Run the optimiser to see recommended sites and justifications.</p>
          )}
        </div>
      </div>
    </main>
  );
}
