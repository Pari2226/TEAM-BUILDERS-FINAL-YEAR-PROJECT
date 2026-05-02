export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface-soft)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-[var(--text-muted)] md:flex-row md:items-center md:justify-between lg:px-8">
        <p>
          © {new Date().getFullYear()} Team Builders. Built for stronger
          hackathon collaboration.
        </p>
        <p>React, Express, MongoDB, Flask</p>
      </div>
    </footer>
  );
}
