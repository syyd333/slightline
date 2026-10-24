import type { CameraStatus } from "@/lib/types";

const styles: Record<CameraStatus, string> = {
  online: "bg-[var(--online)]",
  offline: "bg-[var(--offline)]",
  blocked: "bg-[var(--blocked)]",
};

const labels: Record<CameraStatus, string> = {
  online: "Online",
  offline: "Offline",
  blocked: "Blocked",
};

export function StatusDot({ status }: { status: CameraStatus }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs tracking-wide uppercase text-[var(--mute)]">
      <span className={`h-1.5 w-1.5 rounded-full ${styles[status]}`} />
      {labels[status]}
    </span>
  );
}
