import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiTrendingUp,
  FiZap,
  FiUsers,
  FiCpu,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import PageShell from "../components/layout/PageShell";
import Button from "../components/ui/Button";
import GlassCard from "../components/ui/GlassCard";
import SectionHeading from "../components/ui/SectionHeading";
import TeamCard from "../components/ui/TeamCard";
import { features, testimonials, heroStats } from "../data/mockData";

export default function HomePage() {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/teams")
      .then(({ data }) => setTeams(data.teams.slice(0, 3)))
      .catch(() => setTeams([]));
  }, []);

  return (
    <PageShell>
      <section className="mx-auto grid max-w-7xl gap-14 px-4 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">
        <div className="flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-[var(--chip-text)]"
          >
            <FiCpu /> AI-powered teammate discovery
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-6 max-w-3xl text-5xl font-bold leading-tight text-[var(--heading-text)] md:text-7xl"
          >
            Build Your Dream Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-muted)] md:text-xl"
          >
            Find talented developers, designers, and innovators. Create momentum
            faster with curated profiles, open teams, and ML-powered
            recommendations.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button to="/signup" className="gap-2">
              Get Started <FiArrowRight />
            </Button>
            <Button to="/teams" variant="secondary" className="gap-2">
              Explore Teams <FiTrendingUp />
            </Button>
          </motion.div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <GlassCard key={stat.label} className="p-5">
                <p className="text-sm text-[var(--text-muted)]">{stat.label}</p>
                <h3 className="mt-2 text-3xl font-bold text-[var(--heading-text)]">
                  {stat.value}
                </h3>
              </GlassCard>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45 }}
          className="relative"
        >
          <GlassCard className="relative overflow-hidden p-0">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/25 via-transparent to-emerald-400/20" />
            <div className="relative p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent-text-soft)]">
                Team intelligence
              </p>
              <h2 className="mt-4 text-2xl font-bold text-[var(--heading-text)]">
                Discover the strongest collaboration fit.
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-soft)] p-5">
                  <FiZap className="text-2xl text-cyan-300" />
                  <p className="mt-4 text-sm text-[var(--text-muted)]">
                    Instant matching
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[var(--heading-text)]">
                    Find teammates by skills and role.
                  </p>
                </div>
                <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-soft)] p-5">
                  <FiUsers className="text-2xl text-emerald-300" />
                  <p className="mt-4 text-sm text-[var(--text-muted)]">
                    Open teams
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[var(--heading-text)]">
                    Join projects already looking for talent.
                  </p>
                </div>
              </div>
              <div className="mt-8 rounded-3xl border border-[var(--border)] bg-slate-950/45 p-5">
                <p className="text-sm text-[var(--text-muted)]">
                  Recommended teammate match
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--heading-text)]">
                      Sarah Chen
                    </h3>
                    <p className="text-sm text-[var(--accent-text-soft)]">
                      Full Stack • React • Node • AWS
                    </p>
                  </div>
                  <span className="rounded-full bg-[var(--chip-bg)] px-4 py-2 text-sm font-semibold text-[var(--chip-text)]">
                    96% match
                  </span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Core features"
          title="Everything a modern project team needs"
          description="From discovery to collaboration, Team Builders keeps the workflow focused, premium, and fast."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <GlassCard className="h-full">
                <h3 className="text-xl font-semibold text-[var(--heading-text)]">
                  {feature.title}
                </h3>
                <p className="mt-4 leading-7 text-[var(--text-muted)]">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Trending teams"
          title="Projects people are joining right now"
          description="Browse active teams with strong momentum and visible skill needs."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {teams.map((team) => (
            <TeamCard
              key={team._id}
              team={team}
              actionLabel="View Team"
              onAction={() => navigate("/teams")}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Testimonials"
          title="Teams move faster when the fit is right"
          description="A few words from builders who rely on the platform to form reliable teams."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <GlassCard key={item.name}>
              <p className="text-lg leading-8 text-[var(--app-text)]">
                “{item.quote}”
              </p>
              <div className="mt-6">
                <p className="font-semibold text-[var(--heading-text)]">
                  {item.name}
                </p>
                <p className="text-sm text-[var(--text-muted)]">{item.role}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
