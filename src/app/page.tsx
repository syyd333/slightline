import Link from "next/link";
import { Mark } from "@/components/Mark";

const modules = [
  {
    href: "/planner",
    kicker: "01",
    title: "Placement planner",
    copy: "Incident history, a budget, and OpenStreetMap candidates. A greedy pass buys the coverage that closes the most risk.",
    action: "Run the optimiser",
  },
  {
    href: "/search",
    kicker: "02",
    title: "Footage finder",
    copy: "Type “person in a red jacket.” Ranked clips come back. Clothing and vehicle attributes only — no face match.",
    action: "Search the archive",
  },
  {
    href: "/map",
    kicker: "03",
    title: "Unified camera map",
    copy: "Every camera sits with its viewing cone, so a search narrows to the cameras that could actually have seen the event.",
    action: "Open the map",
  },
  {
    href: "/incidents",
    kicker: "04",
    title: "No-evidence loop",
    copy: "An incident without footage is not a dead end. It raises the priority of that spot in the next placement round.",
    action: "Log a gap",
  },
];

const steps = [
  {
    n: "01",
    title: "Plan from risk",
    copy: "Incident data and a budget decide where cameras go — not where wiring is easy.",
  },
  {
    n: "02",
    title: "Record and index",
    copy: "Frames are sampled, people and vehicles detected, crops turned into searchable embeddings.",
  },
  {
    n: "03",
    title: "Search in words",
    copy: "A sentence returns ranked clips from the cameras whose cones cover the scene.",
  },
  {
    n: "04",
    title: "Close the loop",
    copy: "Incidents with no footage feed the next plan. Coverage improves every round.",
  },
];

export default function Home() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-6 md:pt-24">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[var(--line-strong)]" />
          <p className="rule-label">Surakshit Bharat · Team Codeprix</p>
        </div>

        <div className="mt-8 flex items-start gap-4">
          <Mark className="mt-3 hidden h-9 w-12 shrink-0 sm:block" />
          <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-[2.75rem] leading-[1.06] tracking-tight sm:text-5xl md:text-6xl">
            Connected camera planning
            <span className="text-[var(--accent)]"> &amp; footage search.</span>
          </h1>
        </div>

        <p className="mt-8 max-w-xl text-base leading-8 text-[var(--mute)] sm:text-lg">
          Cameras go up where mounting is cheap, not where incidents happen. SightLine
          plans coverage from risk, then lets investigators search what those cameras
          actually saw.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/map"
            className="rounded-full bg-[var(--ink)] px-5 py-2.5 text-sm text-[var(--paper)] transition hover:bg-[var(--accent)]"
          >
            Open the map
          </Link>
          <Link
            href="/search"
            className="rounded-full border border-[var(--line-strong)] bg-[var(--paper)] px-5 py-2.5 text-sm transition hover:border-[var(--ink)]"
          >
            Search footage
          </Link>
          <Link
            href="/about"
            className="px-2 py-2.5 text-sm text-[var(--mute)] underline decoration-[var(--line-strong)] underline-offset-4 transition hover:text-[var(--ink)]"
          >
            Read the pitch
          </Link>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--paper)]">
        <dl className="mx-auto grid max-w-6xl divide-[var(--line)] px-5 sm:grid-cols-3 sm:divide-x sm:px-6">
          {[
            ["Privacy", "Attribute search only. No facial recognition, ever."],
            ["Hardware", "Ordinary PCs. Frames sampled at 1–2 fps."],
            ["Feedback", "Every no-evidence incident reshapes the next plan."],
          ].map(([term, detail]) => (
            <div key={term} className="py-6 sm:px-6 sm:first:pl-0 sm:last:pr-0">
              <dt className="rule-label">{term}</dt>
              <dd className="mt-2 text-sm leading-6">{detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="rule-label">Modules</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl sm:text-4xl">
              Four pieces, one loop
            </h2>
          </div>
          <Link
            href="/about"
            className="hidden shrink-0 text-sm text-[var(--mute)] underline decoration-[var(--line-strong)] underline-offset-4 hover:text-[var(--ink)] sm:block"
          >
            How it fits together
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {modules.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group flex flex-col justify-between rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-7 transition hover:border-[var(--line-strong)] hover:shadow-[0_1px_0_var(--line-strong)]"
            >
              <div>
                <p className="text-xs tracking-[0.2em] text-[var(--accent)]">{item.kicker}</p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--mute)]">
                  {item.copy}
                </p>
              </div>
              <p className="mt-6 text-xs uppercase tracking-[0.16em] text-[var(--ink)] opacity-70 transition group-hover:opacity-100">
                {item.action} →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--line)] bg-[var(--paper)]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
          <p className="rule-label">The loop</p>
          <ol className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <li key={step.n} className="bg-[var(--paper)] p-6">
                <p className="text-xs tracking-[0.2em] text-[var(--accent)]">{step.n}</p>
                <h3 className="mt-3 text-sm font-medium">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--mute)]">{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
        <blockquote className="max-w-3xl font-[family-name:var(--font-display)] text-2xl leading-snug sm:text-3xl">
          “No camera means no evidence. A camera you can’t search means evidence nobody
          uses.”
        </blockquote>
        <p className="mt-6 max-w-xl text-sm leading-6 text-[var(--mute)]">
          Attribute search, access logs, and a fairness check on every plan. Built to run
          without a server farm, for the towns and campuses that need it most.
        </p>
      </section>
    </main>
  );
}
