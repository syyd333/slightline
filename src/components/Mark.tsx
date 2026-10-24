export function Mark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" className={className} aria-hidden>
      <ellipse cx="24" cy="16" rx="22" ry="13" fill="#C45C3E" />
      <circle cx="24" cy="16" r="8.5" fill="#F7F3EC" />
      <circle cx="24" cy="16" r="4.2" fill="#1C1917" />
    </svg>
  );
}
