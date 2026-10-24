"use client";

import { useEffect, useState } from "react";
import { DynamicMap } from "@/components/DynamicMap";
import { SetupNotice } from "@/components/SetupNotice";
import { StatusDot } from "@/components/StatusDot";
import { seedIfEmpty } from "@/lib/seed";
import { supabase } from "@/lib/supabase";
import type { Camera, Incident } from "@/lib/types";

export default function MapPage() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        await seedIfEmpty();
        const [{ data: cam }, { data: inc }] = await Promise.all([
          supabase.from("cameras").select("*").order("name"),
          supabase.from("incidents").select("*"),
        ]);
        setCameras((cam as Camera[]) ?? []);
        setIncidents((inc as Incident[]) ?? []);
        await supabase.from("access_logs").insert({ action: "view", resource: "camera map" });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not load map data.");
      }
    })();
  }, []);

  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[1.4fr_0.8fr]">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--mute)]">Unified camera map</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl">Where each camera looks</h1>
        <p className="mt-3 max-w-lg text-sm leading-6 text-[var(--mute)]">
          Cones are field of view. Warm markers are cameras. Open circles are incidents — darker fill means no evidence.
        </p>
        <div className="mt-6 h-[520px] overflow-hidden rounded-2xl border border-[var(--line)]">
          <DynamicMap cameras={cameras} incidents={incidents} />
        </div>
      </div>
      <aside className="space-y-3">
        {error && <SetupNotice message={error} />}
        {cameras.map((camera) => (
          <div key={camera.id} className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium">{camera.name}</h2>
              <StatusDot status={camera.status} />
            </div>
            <p className="mt-1 text-xs text-[var(--mute)]">
              {camera.zone} · heading {camera.heading}° · {camera.range_m}m
            </p>
          </div>
        ))}
      </aside>
    </main>
  );
}
