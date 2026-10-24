import Link from "next/link";
import { Mark } from "@/components/Mark";

const modules = [
  {
    href: "/planner",
    kicker: "01",
    title: "Placement planner",
    copy: "Incident history, a budget, and OpenStreetMap candidates. The greedy pass picks coverage, then writes a plain-language why.",
  },
  {
    href: "/search",
    kicker: "02",
    title: "Footage finder",
    copy: "Type “person in a red jacket.” Ranked clips come back. Clothing and vehicle attributes only — no face match.",
  },
  {
    href: "/map",
    kicker: "03",
    title: "Unified camera map",
    copy: "Every camera sits with its viewing cone. Search narrows to the ones that could have seen the event.",
  },
  {
    href: "/incidents",
    kicker: "04",
    title: "No-evidence loop",
    copy: "Incidents without footage raise the priority of those spots in the next placement round.",
  },
];

export default function Home() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-16">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--mute)]">
          Surakshit Bharat · Team Codeprix
        </p>
        <div className="mt-6 flex items-start gap-4">
          <Mark className="mt-2 h-10 w-14" />
          <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-[1.1] tracking-tight md:text-6xl">
            Connected camera planning
            <span className="text-[var(--accent)]"> & footage search.</span>
          </h1>
        </div>
        <p className="mt-8 max-w-xl text-lg leading-8 text-[var(--mute)]">
          Cameras go up where mounting is cheap, not where incidents happen. SightLine
          plans coverage from risk, then lets officers search what those cameras actually saw.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/map"
            className="rounded-full bg-[var(--ink)] px-5 py-2.5 text-sm text-[var(--paper)]"
          >
            Open the map
          </Link>
          <Link
            href="/search"
            className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-5 py-2.5 text-sm"
          >
            Search footage
          </Link>
        </div>
      </section>

      <section className="border-t border-[var(--line)] bg-[var(--paper)]">
        <div className="mx-auto grid max-w-6xl gap-px bg-[var(--line)] px-6 sm:grid-cols-2">
          {modules.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="bg-[var(--paper)] p-8 transition hover:bg-[var(--sand)]"
            >
              <p className="text-xs tracking-[0.2em] text-[var(--accent)]">{item.kicker}</p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl">{item.title}</h2>
              <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--mute)]">{item.copy}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <blockquote className="max-w-3xl font-[family-name:var(--font-display)] text-2xl leading-snug md:text-3xl">
          “No camera means no evidence. A camera you can’t search means evidence nobody uses.”
        </blockquote>
        <p className="mt-6 text-sm text-[var(--mute)]">
          Attribute search. Access logs. Fairness warnings. Built to run without a server farm.
        </p>
      </section>
    </main>
  );
}
