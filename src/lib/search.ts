import { inCone } from "./geo";
import type { Camera, Clip } from "./types";

const COLOR = ["red", "blue", "black", "white", "yellow", "green", "grey", "gray"];
const OBJECT = ["person", "man", "woman", "child", "bike", "motorcycle", "car", "van", "auto", "vehicle"];

export function rankClips(query: string, clips: Clip[], cameras: Camera[]) {
  const q = query.toLowerCase().trim();
  const tokens = q.split(/\s+/).filter(Boolean);
  const color = COLOR.find((c) => q.includes(c));
  const object = OBJECT.find((c) => q.includes(c));

  return clips
    .map((clip) => {
      const camera = cameras.find((c) => c.id === clip.camera_id);
      const hay = `${clip.description} ${clip.tags.join(" ")} ${JSON.stringify(clip.attributes)}`.toLowerCase();
      let score = 0;
      for (const token of tokens) {
        if (hay.includes(token)) score += 1.2;
      }
      if (color && hay.includes(color)) score += 2;
      if (object && hay.includes(object)) score += 1.6;
      if (camera?.status === "online") score += 0.4;
      if (camera && camera.status !== "online") score -= 1.5;
      return { clip, camera, score };
    })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score);
}

export function camerasThatCouldSee(
  cameras: Camera[],
  point: { lat: number; lng: number },
) {
  return cameras.filter((c) => c.status === "online" && inCone(c, point));
}
