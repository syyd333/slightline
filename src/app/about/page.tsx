import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The pitch — SightLine",
  description:
    "Why cameras sit where incidents are not, and how SightLine links placement planning with privacy-first footage search.",
};

const problems = [
  {
    problem: "Placed where cheap, leaving blind spots",
    detail:
      "Cameras are mounted where wiring is convenient, not where incidents happen. The risky lanes stay uncovered.",
    answer: "Placement planner",
    answerDetail:
      "Past incidents, a budget and OpenStreetMap candidates decide the spots that cover the most risk.",
    href: "/planner",
  },
  {
    problem: "Crimes happen without camera evidence",
    detail:
      "An incident outside every cone leaves investigators with no footage at all, and cases stall for lack of proof.",
    answer: "No-evidence loop",
    answerDetail:
      "Incidents without footage raise the priority of that location in the next placement round.",
    href: "/incidents",
  },
  {
    problem: "Officers scrub through hours of video",
    detail:
      "One person or one vehicle means watching recordings from several cameras, frame by frame.",
    answer: "Footage finder",
    answerDetail:
      "Type a description and get ranked clips back, narrowed to the cameras that could have seen it.",
    href: "/search",
  },
  {
    problem: "Broken cameras go unnoticed",
    detail:
      "Faulty, obstructed or misaligned cameras keep running on paper and give a false sense of security.",
    answer: "Camera map",
    answerDetail:
      "Every camera carries a status and a viewing cone, so a blocked view is visible before evidence is needed.",
    href: "/map",
  },
];

const innovations = [
  {
    title: "Closed feedback loop",
    copy: "Every investigation feeds back into planning. Incidents with no camera evidence raise the priority of those locations in the next round, so coverage improves over time.",
  },
  {
    title: "Built for local deployment",
    copy: "A lightweight architecture that runs on ordinary PCs — practical for towns, colonies, campuses and housing societies without a server room.",
  },
  {
    title: "Privacy by design",
    copy: "Attribute-based search — clothing colour, vehicle type — with no facial recognition at all, backed by access logs and optional face blurring.",
  },
  {
    title: "Explainable placement",
    copy: "Every recommended site arrives with a plain-language justification and a fairness warning, so a decision-maker can question the plan.",
  },
];

const comparison = {
  columns: ["SightLine", "StaQU / Innefu", "Verkada / EagleEye"],
  rows: [
    { feature: "Risk-based placement planner", values: ["yes", "limited", "no"] },
    { feature: "Natural language search", values: ["yes", "yes", "yes"] },
    { feature: "Linked placement–search loop", values: ["yes", "no", "no"] },
    { feature: "Runs on a standard PC", values: ["yes", "no", "no"] },
    { feature: "Privacy-first, no face match", values: ["yes", "no", "limited"] },
  ],
} as const;

const prototypeStack = [
  { label: "Interface", value: "Next.js · Tailwind", note: "Planner, finder, map and access log." },
  { label: "Map", value: "Leaflet · OpenStreetMap", note: "Camera positions, cones of view, incidents." },
  { label: "Data", value: "Supabase Postgres", note: "Cameras, incidents, clips, plans, access logs." },
  { label: "Planner", value: "TypeScript", note: "Risk weight, budget, greedy selection, fairness check." },
];

const pipelineStack = [
  { label: "Detection", value: "YOLOv8", note: "People and vehicles at 1–2 frames per second." },
  { label: "Embeddings", value: "OpenCLIP", note: "Crops become colour and clothing vectors." },
  { label: "Index", value: "FAISS", note: "Similarity search over every stored crop." },
  { label: "Geo analysis", value: "GeoPandas · Shapely", note: "Cone modelling and building occlusion at city scale." },
];

const flow = [
  "Load incidents, cameras and candidate sites from the map.",
  "Score a risk grid and model each camera’s cone of view.",
  "Buy the highest gain per rupee until the budget is spent.",
  "Sample footage, detect people and vehicles, embed the crops.",
  "Rank clips against a sentence and hand them to an officer.",
  "Record the no-evidence incidents and change the next plan.",
];

const feasibility = [
  {
    title: "Technical",
    points: [
      "Open-source stack keeps licence cost at zero.",
      "Runs on standard PCs; only 1–2 frames per second are sampled.",
      "Planner and finder are separate modules and ship independently.",
    ],
  },
  {
    title: "Social",
    points: [
      "Fairness check guards against over-policing one pocket.",
      "Every proposed site carries a justification people can argue with.",
      "Built for the towns and campuses that cannot buy enterprise video AI.",
    ],
  },
  {
    title: "Legal & privacy",
    points: [
      "No facial recognition anywhere in the pipeline.",
      "Access logs record every search and map view.",
      "Face blurring is optional on exported frames.",
    ],
  },
  {
    title: "Scale",
    points: [
      "One society, one campus, several towns.",
      "Modular rollout: planning first, search later.",
      "No specialised servers for small deployments.",
    ],
  },
];

const risks = [
  {
    risk: "Private camera and location data is hard to obtain",
    mitigation: "Use public incident records and OpenStreetMap nodes to build the demo and the first pilots.",
  },
  {
    risk: "Detection weakens at night or in dense crowds",
    mitigation: "Keep a human in the loop: officers confirm ranked clips before acting on them.",
  },
  {
    risk: "Historical incident data can be biased",
    mitigation: "Automated regional fairness checker flags clustered placements before a plan is saved.",
  },
  {
    risk: "Communities push back on added surveillance",
    mitigation: "Attribute search only, no face match, access logs visible to the operator.",
  },
];

const audiences = [
  { group: "Civic & community", name: "Housing societies", copy: "Plan gate and lane cameras, then find incidents fast." },
  { group: "Civic & community", name: "Schools & colleges", copy: "Cover campus entries and open areas." },
  { group: "Civic & community", name: "Panchayats & towns", copy: "Low-cost coverage for small towns and villages." },
  { group: "Civic & community", name: "Citizens", copy: "Safer neighbourhoods through fair, transparent placement." },
  { group: "Authorities", name: "Local police stations", copy: "Faster evidence retrieval across linked cameras." },
  { group: "Authorities", name: "Municipalities", copy: "Data-driven camera planning for public spaces." },
  { group: "Authorities", name: "Rapid investigators", copy: "Text search replaces hours of manual scrubbing." },
  { group: "Authorities", name: "Smart city planners", copy: "Risk-based placement with built-in fairness checks." },
];

const metrics = [
  {
    name: "Search time",
    copy: "Time to find one person or vehicle, manual review against SightLine.",
  },
  {
    name: "Risk coverage ratio",
    copy: "Share of high-risk incidents that fall inside a camera’s view.",
  },
  {
    name: "No-evidence incidents",
    copy: "Evidence gaps closed after each feedback-based placement round.",
  },
];

const roadmap = [
  { when: "Now", title: "Working prototype", copy: "Planner and footage finder demonstrated end to end on a campus dataset." },
  { when: "Next", title: "Campus or colony pilot", copy: "Test in a college campus or residential colony with real incident records." },
  { when: "Later", title: "Hindi and Telugu search", copy: "Local-language queries for investigators who do not work in English." },
];

const research = [
  {
    id: "A",
    title: "Bengaluru Police CCTV mapping study · 2025",
    copy: "Analysis of police data use for identifying blind spots and crime-prone hotspots to optimise camera deployment.",
    why: "Shows the value SightLine automates with budget-aware planning.",
  },
  {
    id: "B",
    title: "MAGNAS CCTV searching platform",
    copy: "Academic evaluation of natural-language video processing and vector-search indexing across multiple cameras.",
    why: "Supports the text-query retrieval behind the footage finder.",
  },
  {
    id: "C",
    title: "AI in law enforcement and public safety",
    copy: "Comparative survey of computer-vision techniques including YOLO detection, OpenCLIP embeddings and FAISS indexing.",
    why: "Backs the YOLO → OpenCLIP → FAISS pipeline.",
  },
  {
    id: "D",
    title: "OpenCLIP and Ultralytics YOLO",
    copy: "Open-source implementations for natural-language matching and zero-shot visual detection.",
    why: "Provides the detection and text-to-image matching models.",
    href: "https://github.com/mlfoundations/open_clip",
  },
  {
    id: "E",
    title: "FAISS vector similarity search",
    copy: "Meta AI codebase for fast dense-vector retrieval in video streams.",
    why: "Provides the vector index behind clip ranking.",
    href: "https://github.com/facebookresearch/faiss",
  },
];

const references = [
  {
    label: "Bengaluru police wipe out CCTV blind spots · News Karnataka · 2025",
    href: "https://newskarnataka.com/karnataka/bengaluru/bengaluru-police-use-cctv-for-better-investigation-at-crime-prone-areas/24032025/",
  },
  {
    label: "SIMBA AI-powered crime search, Nagpur Police · IndiaAI case study",
    href: "https://indiaai.gov.in/case-study/fighting-crime-with-ai-powered-simba",
  },
  {
    label: "DeepEye AI, Beed Police platform evaluation · Free Press Journal",
    href: "https://www.freepressjournal.in/pune/deepeye-ai-beed-polices-ai-platform-clears-state-evaluation",
  },
  {
    label: "Verkada AI-powered video search · Security World Market",
    href: "https://www.securityworldmarket.com/na/News/Product-News/verkada-launches-ai-powered-search1",
  },
  {
    label: "Eagle Eye Networks smart video search · developer documentation",
    href: "https://developer.eagleeyenetworks.com/docs/video-search",
  },
];

function Section({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-[var(--line)] py-14 sm:py-16">
      <p className="rule-label">{label}</p>
      <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-3xl leading-tight sm:text-4xl">
        {title}
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Cell({ value }: { value: "yes" | "limited" | "no" }) {
  if (value === "yes") {
    return <span className="text-[var(--online)]">✓</span>;
  }
  if (value === "limited") {
    return <span className="text-xs uppercase tracking-wide text-[var(--blocked)]">Limited</span>;
  }
  return <span className="text-[var(--offline)]">—</span>;
}

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 sm:px-6">
      <section className="pb-12 pt-14 sm:pt-20">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[var(--line-strong)]" />
          <p className="rule-label">The pitch</p>
        </div>
        <h1 className="mt-6 max-w-3xl font-[family-name:var(--font-display)] text-4xl leading-[1.08] sm:text-5xl">
          The gap is not the camera. It is where the camera looks, and what anyone can
          find inside it.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--mute)]">
          SightLine links two things that are usually sold apart: deciding where cameras
          should go, and getting evidence out of the cameras already there. It is built to
          run on a normal computer, and it never matches a face.
        </p>

        <nav className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-t border-[var(--line)] pt-5 text-sm text-[var(--mute)]">
          {[
            ["problem", "Problem"],
            ["innovation", "Innovation"],
            ["architecture", "Architecture"],
            ["feasibility", "Feasibility"],
            ["impact", "Impact"],
            ["research", "Research"],
          ].map(([href, label]) => (
            <a key={href} href={`#${href}`} className="transition hover:text-[var(--ink)]">
              {label}
            </a>
          ))}
        </nav>
      </section>

      <Section
        id="problem"
        label="01 · Problem"
        title="Four failures, one cause: planning and evidence never talk."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {problems.map((row) => (
            <article
              key={row.problem}
              className="flex flex-col rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-6"
            >
              <h3 className="text-sm font-medium">{row.problem}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--mute)]">{row.detail}</p>
              <div className="mt-5 border-t border-[var(--line)] pt-4">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                  What SightLine does
                </p>
                <p className="mt-2 text-sm font-medium">{row.answer}</p>
                <p className="mt-1.5 text-sm leading-6 text-[var(--mute)]">
                  {row.answerDetail}
                </p>
              </div>
              <Link
                href={row.href}
                className="mt-4 self-start text-xs uppercase tracking-[0.16em] text-[var(--ink)] underline decoration-[var(--line-strong)] underline-offset-4 transition hover:text-[var(--accent)]"
              >
                Open it
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="innovation"
        label="02 · Innovation"
        title="The only option here that links placement with search."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {innovations.map((item, index) => (
            <article key={item.title} className="rounded-2xl bg-[var(--paper)] p-6 ring-1 ring-[var(--line)]">
              <p className="text-xs tracking-[0.2em] text-[var(--accent)]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--mute)]">{item.copy}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-[var(--line)] bg-[var(--paper)]">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--line)]">
                <th className="px-5 py-4 text-xs font-normal uppercase tracking-[0.16em] text-[var(--mute)]">
                  Feature
                </th>
                {comparison.columns.map((column) => (
                  <th
                    key={column}
                    className="px-4 py-4 text-xs font-normal uppercase tracking-[0.16em] text-[var(--mute)]"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row) => (
                <tr key={row.feature} className="border-b border-[var(--line)] last:border-0">
                  <th scope="row" className="px-5 py-4 text-left font-normal">
                    {row.feature}
                  </th>
                  {row.values.map((value, index) => (
                    <td key={index} className="px-4 py-4">
                      <Cell value={value} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--mute)]">
          SightLine is the only option in this comparison that links placement planning
          with footage search while staying privacy-first and affordable enough for a
          small deployment.
        </p>
      </Section>

      <Section
        id="architecture"
        label="03 · Technical approach"
        title="A planner, an index, and a loop between them."
      >
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h3 className="rule-label">Running in this prototype</h3>
            <dl className="mt-4 divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)] bg-[var(--paper)]">
              {prototypeStack.map((row) => (
                <div key={row.label} className="px-5 py-4">
                  <dt className="flex items-baseline justify-between gap-4">
                    <span className="text-xs uppercase tracking-[0.14em] text-[var(--mute)]">
                      {row.label}
                    </span>
                    <span className="text-sm font-medium">{row.value}</span>
                  </dt>
                  <dd className="mt-1.5 text-sm leading-6 text-[var(--mute)]">{row.note}</dd>
                </div>
              ))}
            </dl>

            <h3 className="rule-label mt-8">Detection pipeline, piloted next</h3>
            <dl className="mt-4 divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)] bg-[var(--paper)]">
              {pipelineStack.map((row) => (
                <div key={row.label} className="px-5 py-4">
                  <dt className="flex items-baseline justify-between gap-4">
                    <span className="text-xs uppercase tracking-[0.14em] text-[var(--mute)]">
                      {row.label}
                    </span>
                    <span className="text-sm font-medium">{row.value}</span>
                  </dt>
                  <dd className="mt-1.5 text-sm leading-6 text-[var(--mute)]">{row.note}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h3 className="rule-label">How a round runs</h3>
            <ol className="mt-4 space-y-0">
              {flow.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--paper)] text-[11px] text-[var(--mute)]">
                      {index + 1}
                    </span>
                    {index < flow.length - 1 && (
                      <span className="w-px flex-1 bg-[var(--line)]" aria-hidden />
                    )}
                  </div>
                  <p className="pb-6 text-sm leading-6">{step}</p>
                </li>
              ))}
            </ol>
            <div className="rounded-2xl bg-[var(--accent-soft)] p-5 text-sm leading-6 text-[var(--ink)]">
              The last step is what makes the plan improve. An incident with no footage is
              not a failure of the search — it is the next placement decision.
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="feasibility"
        label="04 · Feasibility"
        title="Cheap enough to start, honest about what can go wrong."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {feasibility.map((block) => (
            <article
              key={block.title}
              className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-6"
            >
              <h3 className="text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                {block.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {block.points.map((point) => (
                  <li key={point} className="flex gap-2.5 text-sm leading-6 text-[var(--mute)]">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--line-strong)]" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <h3 className="rule-label mt-10">Risks and how they are handled</h3>
        <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--paper)]">
          {risks.map((row) => (
            <div
              key={row.risk}
              className="grid gap-2 border-b border-[var(--line)] px-5 py-4 last:border-0 sm:grid-cols-2 sm:gap-8"
            >
              <p className="text-sm font-medium">{row.risk}</p>
              <p className="text-sm leading-6 text-[var(--mute)]">
                <span className="mr-1.5 text-[var(--accent)]">→</span>
                {row.mitigation}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="impact"
        label="05 · Impact"
        title="For the places that cannot buy enterprise video AI."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((item) => (
            <article
              key={item.name}
              className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5"
            >
              <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--mute)]">
                {item.group}
              </p>
              <h3 className="mt-2 text-sm font-medium">{item.name}</h3>
              <p className="mt-1.5 text-sm leading-6 text-[var(--mute)]">{item.copy}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-6">
            <h3 className="rule-label">Measured, not claimed</h3>
            <dl className="mt-4 divide-y divide-[var(--line)]">
              {metrics.map((metric) => (
                <div key={metric.name} className="py-4 first:pt-0 last:pb-0">
                  <dt className="text-sm font-medium">{metric.name}</dt>
                  <dd className="mt-1 text-sm leading-6 text-[var(--mute)]">{metric.copy}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-6">
            <h3 className="rule-label">Roadmap</h3>
            <ol className="mt-4 space-y-4">
              {roadmap.map((phase) => (
                <li key={phase.when} className="border-l border-[var(--line-strong)] pl-4">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]">
                    {phase.when}
                  </p>
                  <p className="mt-1 text-sm font-medium">{phase.title}</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--mute)]">{phase.copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <p className="mt-10 font-[family-name:var(--font-display)] text-2xl leading-snug sm:text-3xl">
          “It runs on a normal computer, so any small place can use it.”
        </p>
      </Section>

      <Section id="research" label="06 · Research" title="What this is built on.">
        <div className="grid gap-4 sm:grid-cols-2">
          {research.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5"
            >
              <p className="text-xs tracking-[0.2em] text-[var(--accent)]">{item.id}</p>
              <h3 className="mt-2 text-sm font-medium">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--mute)]">{item.copy}</p>
              <p className="mt-3 text-sm leading-6">
                <span className="text-[var(--mute)]">Relevance · </span>
                {item.why}
              </p>
              {item.href && (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-xs break-all text-[var(--mute)] underline decoration-[var(--line-strong)] underline-offset-4 hover:text-[var(--ink)]"
                >
                  {item.href.replace("https://", "")}
                </a>
              )}
            </article>
          ))}
        </div>

        <h3 className="rule-label mt-10">References</h3>
        <ol className="mt-4 divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)] bg-[var(--paper)]">
          {references.map((reference, index) => (
            <li key={reference.href} className="flex gap-4 px-5 py-4 text-sm">
              <span className="w-4 shrink-0 text-[var(--mute)]">{index + 1}</span>
              <a
                href={reference.href}
                target="_blank"
                rel="noreferrer"
                className="leading-6 break-words underline decoration-[var(--line-strong)] underline-offset-4 transition hover:text-[var(--accent)]"
              >
                {reference.label}
              </a>
            </li>
          ))}
        </ol>
      </Section>

      <section className="border-t border-[var(--line)] py-14">
        <div className="flex flex-col gap-6 rounded-2xl bg-[var(--ink)] px-7 py-9 text-[var(--paper)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] opacity-60">Team Codeprix</p>
            <p className="mt-2 max-w-md font-[family-name:var(--font-display)] text-2xl leading-snug">
              See the loop working on a campus dataset.
            </p>
          </div>
          <Link
            href="/planner"
            className="shrink-0 self-start rounded-full bg-[var(--paper)] px-5 py-2.5 text-sm text-[var(--ink)] sm:self-auto"
          >
            Run the planner
          </Link>
        </div>
      </section>
    </main>
  );
}
