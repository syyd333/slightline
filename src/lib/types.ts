export type CameraStatus = "online" | "offline" | "blocked";

export type Camera = {
  id: string;
  name: string;
  zone: string;
  lat: number;
  lng: number;
  heading: number;
  fov: number;
  range_m: number;
  status: CameraStatus;
  created_at: string;
};

export type CandidateSite = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  cost: number;
  notes: string | null;
};

export type Incident = {
  id: string;
  title: string;
  lat: number;
  lng: number;
  occurred_at: string;
  severity: number;
  has_evidence: boolean;
  notes: string | null;
};

export type Clip = {
  id: string;
  camera_id: string | null;
  captured_at: string;
  description: string;
  tags: string[];
  attributes: Record<string, string>;
};

export type PlacementPlan = {
  id: string;
  budget: number;
  selected: PlannedSite[];
  coverage_score: number;
  fairness_warning: string | null;
  created_at: string;
};

export type PlannedSite = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  cost: number;
  gain: number;
  justification: string;
};

export type AccessLog = {
  id: string;
  action: string;
  resource: string;
  created_at: string;
};

export const CAMPUS_CENTER = { lat: 17.3108, lng: 78.4045 };
