"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { CAMPUS_CENTER, type Camera, type CandidateSite, type Incident } from "@/lib/types";

type Props = {
  cameras: Camera[];
  incidents?: Incident[];
  sites?: CandidateSite[];
  selectedIds?: string[];
};

function conePoints(camera: Camera) {
  const steps = 12;
  const points: [number, number][] = [[camera.lat, camera.lng]];
  const start = camera.heading - camera.fov / 2;
  for (let i = 0; i <= steps; i++) {
    const bearing = ((start + (camera.fov * i) / steps) * Math.PI) / 180;
    const d = camera.range_m / 111320;
    const lat = camera.lat + d * Math.cos(bearing);
    const lng =
      camera.lng + (d * Math.sin(bearing)) / Math.cos((camera.lat * Math.PI) / 180);
    points.push([lat, lng]);
  }
  return points;
}

export function CameraMap({ cameras, incidents = [], sites = [], selectedIds = [] }: Props) {
  useEffect(() => {
    const map = L.map("sightline-map", {
      center: [CAMPUS_CENTER.lat, CAMPUS_CENTER.lng],
      zoom: 17,
      zoomControl: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: "&copy; OSM &copy; CARTO",
    }).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    cameras.forEach((camera) => {
      const color =
        camera.status === "online" ? "#C45C3E" : camera.status === "blocked" ? "#B45309" : "#9A8F82";
      L.polygon(conePoints(camera), {
        color,
        fillColor: color,
        fillOpacity: camera.status === "online" ? 0.18 : 0.08,
        weight: 1,
      }).addTo(map);

      L.circleMarker([camera.lat, camera.lng], {
        radius: 6,
        color: "#1C1917",
        weight: 1,
        fillColor: color,
        fillOpacity: 1,
      })
        .bindPopup(`<strong>${camera.name}</strong><br/>${camera.zone} · ${camera.status}`)
        .addTo(map);
    });

    incidents.forEach((incident) => {
      L.circleMarker([incident.lat, incident.lng], {
        radius: 7,
        color: incident.has_evidence ? "#3F5E4A" : "#8A3B2A",
        fillColor: incident.has_evidence ? "#E7EFE8" : "#F4D7CC",
        fillOpacity: 1,
        weight: 1.5,
      })
        .bindPopup(
          `<strong>${incident.title}</strong><br/>${incident.has_evidence ? "Has evidence" : "No evidence"}`,
        )
        .addTo(map);
    });

    sites.forEach((site) => {
      const picked = selectedIds.includes(site.id);
      L.circleMarker([site.lat, site.lng], {
        radius: picked ? 8 : 5,
        color: picked ? "#C45C3E" : "#8A7F72",
        fillColor: picked ? "#C45C3E" : "#F7F3EC",
        fillOpacity: 1,
        weight: 1.5,
      })
        .bindPopup(`<strong>${site.name}</strong><br/>₹${site.cost.toLocaleString("en-IN")}`)
        .addTo(map);
    });

    return () => {
      map.remove();
    };
  }, [cameras, incidents, sites, selectedIds]);

  return <div id="sightline-map" className="h-full min-h-[420px] w-full rounded-2xl" />;
}
