export default function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-white/60">{label}</p>
          <h3 className="mt-2 text-2xl font-bold text-white">{value}</h3>
        </div>
        {Icon ? <Icon className="text-2xl text-cyan-300" /> : null}
      </div>
    </div>
  );
}
