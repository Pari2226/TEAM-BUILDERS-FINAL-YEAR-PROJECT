export default function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-[28px] border border-white/10 bg-white/10 p-6 shadow-glow backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}
