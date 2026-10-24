import { supabase } from "./supabase";

const cameras = [
  {
    name: "Main gate",
    zone: "Entry",
    lat: 17.31155,
    lng: 78.40492,
    heading: 210,
    fov: 75,
    range_m: 90,
    status: "online",
  },
  {
    name: "Academic quad",
    zone: "Campus",
    lat: 17.31095,
    lng: 78.4042,
    heading: 140,
    fov: 80,
    range_m: 85,
    status: "online",
  },
  {
    name: "Hostel lane",
    zone: "Residential",
    lat: 17.31015,
    lng: 78.40355,
    heading: 40,
    fov: 70,
    range_m: 70,
    status: "blocked",
  },
  {
    name: "Parking shed",
    zone: "Parking",
    lat: 17.3112,
    lng: 78.4037,
    heading: 90,
    fov: 65,
    range_m: 60,
    status: "offline",
  },
  {
    name: "Playground edge",
    zone: "Open area",
    lat: 17.3104,
    lng: 78.40535,
    heading: 300,
    fov: 90,
    range_m: 100,
    status: "online",
  },
];

const sites = [
  { name: "Rear wall junction", lat: 17.30955, lng: 78.4039, cost: 18000, notes: "OSM node near unlit service road" },
  { name: "Bus stop canopy", lat: 17.3119, lng: 78.4054, cost: 22000, notes: "Public approach, high footfall" },
  { name: "Hostel back alley", lat: 17.3099, lng: 78.4031, cost: 16000, notes: "Repeated no-evidence reports" },
  { name: "Water tank terrace", lat: 17.3107, lng: 78.40485, cost: 28000, notes: "Wide cone over open ground" },
  { name: "Canteen corner", lat: 17.31035, lng: 78.40455, cost: 15000, notes: "Evening crowd pinch point" },
  { name: "Staff quarters bend", lat: 17.3094, lng: 78.4048, cost: 20000, notes: "Blind approach from the south" },
];

const incidents = [
  {
    title: "Two-wheeler lifted from hostel lane",
    lat: 17.30992,
    lng: 78.4032,
    occurred_at: "2026-09-12T21:40:00+05:30",
    severity: 4,
    has_evidence: false,
    notes: "No usable camera angle. Priority for next placement round.",
  },
  {
    title: "Bag snatch near main gate",
    lat: 17.3115,
    lng: 78.4048,
    occurred_at: "2026-08-03T18:10:00+05:30",
    severity: 3,
    has_evidence: true,
    notes: "Gate camera captured a person in a red jacket.",
  },
  {
    title: "Unknown van idling after hours",
    lat: 17.3095,
    lng: 78.40475,
    occurred_at: "2026-10-01T23:05:00+05:30",
    severity: 3,
    has_evidence: false,
    notes: "South bend is outside every current cone.",
  },
  {
    title: "Fight on playground edge",
    lat: 17.3105,
    lng: 78.4052,
    occurred_at: "2026-07-19T16:30:00+05:30",
    severity: 2,
    has_evidence: true,
    notes: "Playground camera online.",
  },
  {
    title: "Scooter crash at bus approach",
    lat: 17.31185,
    lng: 78.40525,
    occurred_at: "2026-06-22T08:20:00+05:30",
    severity: 4,
    has_evidence: false,
    notes: "Public road, no campus camera faced this way.",
  },
];

const clipRows = [
  {
    cameraName: "Main gate",
    captured_at: "2026-08-03T18:09:00+05:30",
    description: "Person in a red jacket walking past the boom barrier with a black backpack.",
    tags: ["person", "red", "jacket", "backpack", "gate"],
    attributes: { clothing: "red jacket", object: "person" },
  },
  {
    cameraName: "Main gate",
    captured_at: "2026-08-03T18:11:20+05:30",
    description: "White motorcycle leaving campus, rider wearing a helmet and red jacket.",
    tags: ["motorcycle", "white", "person", "red", "helmet"],
    attributes: { vehicle: "motorcycle", color: "white" },
  },
  {
    cameraName: "Academic quad",
    captured_at: "2026-09-02T13:14:00+05:30",
    description: "Group of students, one person in a blue shirt carrying a yellow bag.",
    tags: ["person", "blue", "yellow", "bag"],
    attributes: { clothing: "blue shirt", object: "person" },
  },
  {
    cameraName: "Playground edge",
    captured_at: "2026-07-19T16:28:00+05:30",
    description: "Two people near the fence, one in a black hoodie.",
    tags: ["person", "black", "hoodie", "fight"],
    attributes: { clothing: "black hoodie", object: "person" },
  },
  {
    cameraName: "Playground edge",
    captured_at: "2026-10-10T07:45:00+05:30",
    description: "Yellow auto-rickshaw dropping a passenger at the east path.",
    tags: ["auto", "vehicle", "yellow"],
    attributes: { vehicle: "auto", color: "yellow" },
  },
  {
    cameraName: "Hostel lane",
    captured_at: "2026-09-12T21:38:00+05:30",
    description: "Partial frame, view blocked by a tarpaulin. Dark two-wheeler silhouette.",
    tags: ["bike", "blocked", "night"],
    attributes: { vehicle: "bike", note: "blocked" },
  },
];

export async function seedIfEmpty() {
  const { count, error } = await supabase.from("cameras").select("*", { count: "exact", head: true });
  if (error) throw error;
  if ((count ?? 0) > 0) return { seeded: false };

  const { data: cameraRows, error: camErr } = await supabase.from("cameras").insert(cameras).select();
  if (camErr) throw camErr;

  const { error: siteErr } = await supabase.from("candidate_sites").insert(sites);
  if (siteErr) throw siteErr;

  const { error: incErr } = await supabase.from("incidents").insert(incidents);
  if (incErr) throw incErr;

  const byName = new Map((cameraRows ?? []).map((c) => [c.name, c.id]));
  const { error: clipErr } = await supabase.from("clips").insert(
    clipRows.map((clip) => ({
      camera_id: byName.get(clip.cameraName) ?? null,
      captured_at: clip.captured_at,
      description: clip.description,
      tags: clip.tags,
      attributes: clip.attributes,
    })),
  );
  if (clipErr) throw clipErr;

  await supabase.from("access_logs").insert({
    action: "seed",
    resource: "demo campus dataset",
  });

  return { seeded: true };
}
