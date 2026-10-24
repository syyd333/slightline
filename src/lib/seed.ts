import { supabase } from "./supabase";

// The Hyderabad campus cluster the planner runs on.
const campusCameras = [
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

// City cameras across India, so the unified map is a national picture rather
// than a single campus. Names sort by city; zone stays a functional label.
const cityCameras = [
  { name: "Ahmedabad · Sabarmati riverfront", zone: "Riverfront", lat: 23.0258, lng: 72.5806, heading: 70, fov: 80, range_m: 140, status: "online" },
  { name: "Bengaluru · Majestic bus stand", zone: "Transit", lat: 12.9766, lng: 77.5727, heading: 190, fov: 85, range_m: 110, status: "online" },
  { name: "Bengaluru · MG Road junction", zone: "Main road", lat: 12.9756, lng: 77.6068, heading: 260, fov: 70, range_m: 100, status: "online" },
  { name: "Bhopal · Upper Lake ghat", zone: "Lakefront", lat: 23.246, lng: 77.36, heading: 45, fov: 75, range_m: 90, status: "online" },
  { name: "Chandigarh · Sector 17 plaza", zone: "Market", lat: 30.738, lng: 76.782, heading: 135, fov: 80, range_m: 120, status: "online" },
  { name: "Chennai · Central station forecourt", zone: "Transit", lat: 13.0827, lng: 80.2757, heading: 20, fov: 85, range_m: 130, status: "online" },
  { name: "Chennai · Marina promenade", zone: "Beachfront", lat: 13.052, lng: 80.282, heading: 100, fov: 90, range_m: 150, status: "blocked" },
  { name: "Delhi · Connaught Place", zone: "Market", lat: 28.6315, lng: 77.2167, heading: 300, fov: 75, range_m: 110, status: "online" },
  { name: "Delhi · India Gate lawns", zone: "Heritage", lat: 28.6129, lng: 77.2295, heading: 250, fov: 80, range_m: 160, status: "online" },
  { name: "Guwahati · Fancy Bazaar", zone: "Market", lat: 26.184, lng: 91.745, heading: 15, fov: 70, range_m: 90, status: "online" },
  { name: "Hyderabad · Charminar plaza", zone: "Heritage", lat: 17.3616, lng: 78.4747, heading: 320, fov: 85, range_m: 120, status: "online" },
  { name: "Hyderabad · Secunderabad station", zone: "Transit", lat: 17.4399, lng: 78.5015, heading: 210, fov: 80, range_m: 130, status: "offline" },
  { name: "Jaipur · Hawa Mahal lane", zone: "Heritage", lat: 26.9239, lng: 75.8267, heading: 180, fov: 70, range_m: 95, status: "online" },
  { name: "Kochi · Marine Drive walkway", zone: "Waterfront", lat: 9.971, lng: 76.283, heading: 30, fov: 85, range_m: 110, status: "online" },
  { name: "Kolkata · Howrah bridge approach", zone: "Bridge", lat: 22.5851, lng: 88.3468, heading: 95, fov: 75, range_m: 120, status: "online" },
  { name: "Kolkata · Park Street", zone: "Main road", lat: 22.5535, lng: 88.352, heading: 270, fov: 70, range_m: 100, status: "online" },
  { name: "Lucknow · Hazratganj crossing", zone: "Main road", lat: 26.85, lng: 80.946, heading: 350, fov: 80, range_m: 105, status: "online" },
  { name: "Mumbai · Bandra station east", zone: "Transit", lat: 19.0544, lng: 72.8403, heading: 60, fov: 85, range_m: 115, status: "online" },
  { name: "Mumbai · Gateway approach", zone: "Heritage", lat: 18.922, lng: 72.8347, heading: 200, fov: 90, range_m: 140, status: "online" },
  { name: "Mumbai · Marine Drive", zone: "Waterfront", lat: 18.943, lng: 72.823, heading: 120, fov: 75, range_m: 130, status: "blocked" },
  { name: "Nagpur · Sitabuldi market", zone: "Market", lat: 21.146, lng: 79.088, heading: 240, fov: 70, range_m: 95, status: "online" },
  { name: "Patna · Gandhi Maidan", zone: "Open ground", lat: 25.62, lng: 85.14, heading: 45, fov: 85, range_m: 120, status: "offline" },
  { name: "Pune · Shaniwar Wada gate", zone: "Heritage", lat: 18.5195, lng: 73.8554, heading: 160, fov: 75, range_m: 90, status: "online" },
  { name: "Visakhapatnam · RK Beach road", zone: "Beachfront", lat: 17.712, lng: 83.32, heading: 85, fov: 90, range_m: 140, status: "online" },
];

const cameras = [...campusCameras, ...cityCameras];

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

async function runSeed() {
  const { count, error } = await supabase.from("cameras").select("*", { count: "exact", head: true });
  if (error) throw error;
  // The upserts below are idempotent, so an existing partial dataset (for example
  // before the city cameras were added) is topped up rather than skipped.
  if ((count ?? 0) >= cameras.length) return { seeded: false };

  // Upserts against the unique indexes in the seed_guard migration: if two mounts
  // race, the loser inserts nothing instead of duplicating the demo dataset.
  const { data: cameraRows, error: camErr } = await supabase
    .from("cameras")
    .upsert(cameras, { onConflict: "name", ignoreDuplicates: true })
    .select("id, name");
  if (camErr) throw camErr;

  const { error: siteErr } = await supabase
    .from("candidate_sites")
    .upsert(sites, { onConflict: "name", ignoreDuplicates: true });
  if (siteErr) throw siteErr;

  const { error: incErr } = await supabase
    .from("incidents")
    .upsert(incidents, { onConflict: "title,occurred_at", ignoreDuplicates: true });
  if (incErr) throw incErr;

  const { data: allCameras, error: listErr } = await supabase.from("cameras").select("id, name");
  if (listErr) throw listErr;
  const byName = new Map((allCameras ?? cameraRows ?? []).map((c) => [c.name, c.id]));

  const { error: clipErr } = await supabase.from("clips").upsert(
    clipRows.map((clip) => ({
      camera_id: byName.get(clip.cameraName) ?? null,
      captured_at: clip.captured_at,
      description: clip.description,
      tags: clip.tags,
      attributes: clip.attributes,
    })),
    { onConflict: "description,captured_at", ignoreDuplicates: true },
  );
  if (clipErr) throw clipErr;

  if ((cameraRows ?? []).length === 0) return { seeded: false };

  await supabase.from("access_logs").insert({
    action: "seed",
    resource: "demo campus dataset",
  });

  return { seeded: true };
}

let pending: Promise<{ seeded: boolean }> | null = null;

/** Seeds the demo dataset once, sharing one request across every caller. */
export function seedIfEmpty() {
  if (!pending) {
    pending = runSeed().catch((err) => {
      pending = null;
      throw err;
    });
  }
  return pending;
}
