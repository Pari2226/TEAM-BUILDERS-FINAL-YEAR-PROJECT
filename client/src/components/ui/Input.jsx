export default function Input({ label, error, className = "", ...props }) {
  return (
    <label
      className={`flex w-full flex-col gap-2 text-sm text-[var(--text-muted)] ${className}`}
    >
      {label && <span className="font-medium">{label}</span>}
      <input
        {...props}
        className={`rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 text-[var(--app-text)] outline-none transition placeholder:text-[var(--text-subtle)] focus:border-cyan-300/60 focus:bg-[var(--surface)] ${error ? "border-rose-400/60" : ""}`}
      />
      {error && <span className="text-xs text-rose-300">{error}</span>}
    </label>
  );
}
