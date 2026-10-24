import { haversineMeters, inCone } from "./geo";
import type { Camera, CandidateSite, Incident, PlannedSite } from "./types";

const COVER_M = 110;

function coveredBy(
  point: { lat: number; lng: number },
  cameras: Pick<Camera, "lat" | "lng" | "heading" | "fov" | "range_m" | "status">[],
  extras: { lat: number; lng: number }[],
) {
  const live = cameras.filter((c) => c.status === "online");
  if (live.some((c) => inCone(c, point))) return true;
  return extras.some((site) => haversineMeters(site, point) <= COVER_M);
}

function incidentWeight(incident: Incident) {
  return incident.severity * (incident.has_evidence ? 1 : 2.4);
}

export function planPlacements(
  sites: CandidateSite[],
  cameras: Camera[],
  incidents: Incident[],
  budget: number,
) {
  const remaining = [...sites];
  const selected: PlannedSite[] = [];
  let spent = 0;

  const gainFor = (site: CandidateSite, extras: { lat: number; lng: number }[]) => {
    let gain = 0;
    const reasons: string[] = [];
    for (const incident of incidents) {
      const already = coveredBy(incident, cameras, extras);
      const wouldCover = haversineMeters(site, incident) <= COVER_M;
      if (!already && wouldCover) {
        const w = incidentWeight(incident);
        gain += w;
        reasons.push(
          `${incident.has_evidence ? "covers" : "closes a no-evidence gap at"} ${incident.title.toLowerCase()}`,
        );
      }
    }
    return { gain, reasons };
  };

  while (remaining.length) {
    let bestIndex = -1;
    let bestGain = 0;
    let bestReasons: string[] = [];

    remaining.forEach((site, index) => {
      if (spent + site.cost > budget) return;
      const { gain, reasons } = gainFor(site, selected);
      const value = gain / Math.max(site.cost / 10000, 0.4);
      const bestValue = bestIndex === -1 ? -1 : bestGain / Math.max(remaining[bestIndex].cost / 10000, 0.4);
      if (gain > 0 && value > bestValue) {
        bestIndex = index;
        bestGain = gain;
        bestReasons = reasons;
      }
    });

    if (bestIndex === -1) break;
    const site = remaining.splice(bestIndex, 1)[0];
    spent += site.cost;
    selected.push({
      id: site.id,
      name: site.name,
      lat: site.lat,
      lng: site.lng,
      cost: site.cost,
      gain: Number(bestGain.toFixed(2)),
      justification: bestReasons.slice(0, 3).join("; ") || "Improves residual coverage within budget.",
    });
  }

  const uncovered = incidents.filter((i) => !coveredBy(i, cameras, selected));
  const coverageScore =
    incidents.length === 0
      ? 0
      : Number((((incidents.length - uncovered.length) / incidents.length) * 100).toFixed(1));

  const lats = selected.map((s) => s.lat);
  const spread = lats.length < 2 ? 1 : Math.max(...lats) - Math.min(...lats);
  const fairnessWarning =
    selected.length >= 2 && spread < 0.002
      ? "Fairness check: recommended sites cluster in one pocket. Consider spreading the next round."
      : selected.length === 0
        ? "No site beat the current coverage within this budget."
        : null;

  return { selected, spent, coverageScore, fairnessWarning, uncovered };
}
