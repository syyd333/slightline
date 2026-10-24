"use client";

import dynamic from "next/dynamic";
import type { Camera, CandidateSite, Incident } from "@/lib/types";

const CameraMap = dynamic(() => import("./CameraMap").then((m) => m.CameraMap), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[420px] items-center justify-center rounded-2xl bg-[var(--paper)] text-sm text-[var(--mute)]">
      Loading map…
    </div>
  ),
});

export function DynamicMap(props: {
  cameras: Camera[];
  incidents?: Incident[];
  sites?: CandidateSite[];
  selectedIds?: string[];
}) {
  return <CameraMap {...props} />;
}
