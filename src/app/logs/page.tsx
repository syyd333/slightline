"use client";

import { useEffect, useState } from "react";
import { SetupNotice } from "@/components/SetupNotice";
import { seedIfEmpty } from "@/lib/seed";
import { supabase } from "@/lib/supabase";
import type { AccessLog } from "@/lib/types";

export default function LogsPage() {
  const [logs, setLogs] = useState<AccessLog[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        await seedIfEmpty();
        const { data, error: loadError } = await supabase
          .from("access_logs")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(40);
        if (loadError) throw loadError;
        setLogs((data as AccessLog[]) ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not load access logs.");
      }
    })();
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--mute)]">Privacy</p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl">Access logs</h1>
      <p className="mt-3 text-sm leading-6 text-[var(--mute)]">
        Searches and map views are recorded. SightLine searches attributes, not faces.
      </p>
      {error && <div className="mt-6"><SetupNotice message={error} /></div>}
      <ul className="mt-8 divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)] bg-[var(--paper)]">
        {logs.map((log) => (
          <li key={log.id} className="flex items-baseline justify-between gap-4 px-5 py-3 text-sm">
            <span>
              <span className="text-[var(--accent)]">{log.action}</span> · {log.resource}
            </span>
            <span className="text-xs text-[var(--mute)]">
              {new Date(log.created_at).toLocaleString("en-IN")}
            </span>
          </li>
        ))}
        {logs.length === 0 && !error && (
          <li className="px-5 py-6 text-sm text-[var(--mute)]">No access events yet.</li>
        )}
      </ul>
    </main>
  );
}
