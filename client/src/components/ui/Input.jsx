export default function Input({ label, error, className = "", ...props }) {
  return (
    <label
      className={`flex w-full flex-col gap-2 text-sm text-white/80 ${className}`}
    >
      {label && <span className="font-medium">{label}</span>}
      <input
        {...props}
        className={`rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/60 focus:bg-white/10 ${error ? "border-rose-400/60" : ""}`}
      />
      {error && <span className="text-xs text-rose-300">{error}</span>}
    </label>
  );
}
