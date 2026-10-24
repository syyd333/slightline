export function haversineMeters(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
) {
  const R = 6371000;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function bearingDegrees(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number },
) {
  const y =
    Math.sin(((to.lng - from.lng) * Math.PI) / 180) *
    Math.cos((to.lat * Math.PI) / 180);
  const x =
    Math.cos((from.lat * Math.PI) / 180) * Math.sin((to.lat * Math.PI) / 180) -
    Math.sin((from.lat * Math.PI) / 180) *
      Math.cos((to.lat * Math.PI) / 180) *
      Math.cos(((to.lng - from.lng) * Math.PI) / 180);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

export function inCone(
  camera: {
    lat: number;
    lng: number;
    heading: number;
    fov: number;
    range_m: number;
  },
  point: { lat: number; lng: number },
) {
  const dist = haversineMeters(camera, point);
  if (dist > camera.range_m) return false;
  const bearing = bearingDegrees(camera, point);
  let delta = Math.abs(bearing - camera.heading) % 360;
  if (delta > 180) delta = 360 - delta;
  return delta <= camera.fov / 2;
}
