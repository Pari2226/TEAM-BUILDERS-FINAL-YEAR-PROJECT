export default function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-glow backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}
