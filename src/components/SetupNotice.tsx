export function SetupNotice({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5 text-sm leading-6 text-[var(--mute)]">
      {message}
    </div>
  );
}
