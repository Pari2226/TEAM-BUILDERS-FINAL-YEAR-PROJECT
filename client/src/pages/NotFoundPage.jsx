import PageShell from "../components/layout/PageShell";
import Button from "../components/ui/Button";

export default function NotFoundPage() {
  return (
    <PageShell className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center px-4 py-20 lg:px-8">
      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent-text)]">
          404
        </p>
        <h1 className="mt-4 text-4xl font-bold text-[var(--heading-text)] md:text-6xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[var(--text-muted)]">
          The page you are looking for does not exist or has moved.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button to="/">Back home</Button>
          <Button variant="secondary" to="/teams">
            Explore teams
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
