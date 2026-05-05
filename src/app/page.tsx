"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Feature {
  label: string;
  title: string;
  description: string;
  detail: string;
}

interface Market {
  flag: string;
  lang: string;
  country: string;
  example: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURES: Feature[] = [
  {
    label: "01 / OFFER",
    title: "A real service. A real price.",
    description:
      "Clear service definition tied to a specific vertical and market. Setup fee + monthly retainer, priced for local SMEs.",
    detail: '"Fill your weekday slots with Meta ads + booking optimization."',
  },
  {
    label: "02 / BRAND",
    title: "Named. Positioned. Toned.",
    description:
      "Localized business name, positioning, and voice — written in native language by Nils, not translated from English.",
    detail: "Swedish directness. German formality. Danish understatement.",
  },
  {
    label: "03 / WEBSITE",
    title: "Conversion page in local language.",
    description:
      "A full landing page ready to deploy. Not SaaS copy. Not translated English. The buyer reads it and thinks a local wrote it.",
    detail: "Because one did.",
  },
  {
    label: "04 / LEAD GEN",
    title: "3–5 Meta ads. 3–5 TikToks. 90-day calendar.",
    description:
      "Creative briefs and copy ready to run. Structured for the actual buyer attention patterns in that market.",
    detail: "Padel clubs, fitness studios, dental practices.",
  },
  {
    label: "05 / SALES KIT",
    title: "Proposal. Outreach. Case study structure.",
    description:
      "Email and LinkedIn scripts in local language. A proposal template ready to customize. A case study frame ready to fill.",
    detail: "Close the first client. Then the second.",
  },
  {
    label: "06 / DELIVERY",
    title: "What you actually do for clients.",
    description:
      "Step-by-step execution guide. Localized tool stack. Time estimates per task. So you can deliver what you just sold.",
    detail: "Operator-grade. Not aspirational.",
  },
];

const MARKETS: Market[] = [
  {
    flag: "🇸🇪",
    lang: "Svenska",
    country: "Sweden",
    example: "Fyll dina vardagsslottar med Meta-annonser",
  },
  {
    flag: "🇳🇴",
    lang: "Norsk",
    country: "Norway",
    example: "Fyll hverdagstimene dine med Meta-annonser",
  },
  {
    flag: "🇩🇰",
    lang: "Dansk",
    country: "Denmark",
    example: "Fyld dine hverdagstider med Meta-annoncer",
  },
  {
    flag: "🇫🇮",
    lang: "Suomi",
    country: "Finland",
    example: "Täytä arkiajasi Meta-mainoksilla",
  },
  {
    flag: "🇩🇪",
    lang: "Deutsch",
    country: "Germany",
    example: "Füllen Sie Ihre Wochentag-Slots mit Meta-Anzeigen",
  },
];

const STEPS = [
  {
    n: "01",
    title: "You prompt",
    description:
      'Type your target: market, location, vertical. "Build me a business serving Stockholm padel clubs."',
  },
  {
    n: "02",
    title: "Nils generates",
    description:
      "Six output categories. Offer, brand, website, lead gen, sales kit, delivery system — all in native language.",
  },
  {
    n: "03",
    title: "You close",
    description:
      "Go out with the kit. The test is a paying SME client within 14 days. No rewriting. No repositioning.",
  },
];

const LOG_ENTRIES = [
  { status: "done", msg: "generating offer for Stockholm padel clubs" },
  { status: "done", msg: "writing brand name in Swedish" },
  { status: "done", msg: "building landing page copy — native language" },
  { status: "done", msg: "generating 5× Meta ad briefs" },
  { status: "active", msg: "writing LinkedIn outreach scripts" },
  { status: "pending", msg: "building delivery playbook" },
  { status: "pending", msg: "generating proposal template" },
];

// ─── Components ───────────────────────────────────────────────────────────────

function StatusDot({ status }: { status: "done" | "active" | "pending" }) {
  if (status === "done")
    return <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />;
  if (status === "active")
    return (
      <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block animate-pulse" />
    );
  return (
    <span className="w-1.5 h-1.5 rounded-full bg-white/20 inline-block" />
  );
}

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-bg/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-accent font-semibold tracking-tight text-sm">
            nils
          </span>
          <span className="font-mono text-white/20 text-xs">v0.1</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["product", "markets", "pricing"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="font-mono text-xs text-white/40 hover:text-white/70 transition-colors uppercase tracking-widest"
            >
              {item}
            </a>
          ))}
        </div>
        <a
          href="#waitlist"
          className="font-mono text-xs bg-accent text-bg px-4 py-2 hover:bg-accent/90 transition-colors font-medium"
        >
          Get early access
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-14 overflow-hidden grid-bg">
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(34,197,94,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center w-full">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 border border-accent/30 bg-accent/[0.07] px-3 py-1.5 mb-8">
            <StatusDot status="active" />
            <span className="font-mono text-xs text-accent/80 uppercase tracking-widest">
              Phase 1 — Boutique fitness &amp; padel
            </span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-semibold text-white/90 leading-[1.1] tracking-tight mb-6">
            Start your agency
            <br />
            <span className="text-accent">in a day.</span>
          </h1>

          <p className="text-base lg:text-lg text-white/50 leading-relaxed max-w-md mb-10">
            Nils generates a complete, sellable local service business — offer,
            brand, website, ads, sales kit, and delivery playbook — in under 24
            hours. Built natively for Nordic and DACH markets.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#waitlist"
              className="inline-flex items-center justify-center bg-accent text-bg font-mono text-sm font-semibold px-6 py-3 hover:bg-accent/90 transition-colors"
            >
              Join the waitlist
            </a>
            <a
              href="#product"
              className="inline-flex items-center justify-center border border-white/10 text-white/60 font-mono text-sm px-6 py-3 hover:border-white/20 hover:text-white/80 transition-colors"
            >
              See how it works
            </a>
          </div>

          <div className="mt-10 flex items-center gap-6">
            <div className="font-mono text-xs text-white/25 uppercase tracking-widest">
              Markets
            </div>
            <div className="flex gap-2">
              {MARKETS.map((m) => (
                <span
                  key={m.country}
                  title={m.country}
                  className="text-lg leading-none"
                >
                  {m.flag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right — simulated activity feed */}
        <div className="hidden lg:block">
          <div className="border border-white/[0.08] bg-surface rounded-none">
            {/* Window chrome */}
            <div className="border-b border-white/[0.08] px-4 py-3 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
              <span className="ml-3 font-mono text-xs text-white/25">
                nils — generating business
              </span>
            </div>
            {/* Prompt input */}
            <div className="px-4 py-3 border-b border-white/[0.05] font-mono text-sm text-white/60">
              <span className="text-accent/70">&gt;</span>{" "}
              <span className="text-white/70">
                Build me a business serving Stockholm padel clubs
              </span>
              <span className="animate-blink text-accent ml-0.5">▌</span>
            </div>
            {/* Activity log */}
            <div className="px-4 py-4 space-y-3">
              {LOG_ENTRIES.map((entry, i) => (
                <div key={i} className="flex items-center gap-3">
                  <StatusDot status={entry.status as "done" | "active" | "pending"} />
                  <span
                    className={`font-mono text-xs ${
                      entry.status === "done"
                        ? "text-white/50 line-through decoration-white/20"
                        : entry.status === "active"
                        ? "text-white/80"
                        : "text-white/20"
                    }`}
                  >
                    {entry.msg}
                  </span>
                </div>
              ))}
            </div>
            {/* Status bar */}
            <div className="border-t border-white/[0.06] px-4 py-2.5 flex items-center justify-between">
              <span className="font-mono text-xs text-white/25">
                elapsed: 00:04:12
              </span>
              <span className="font-mono text-xs text-accent/60">
                5/7 complete
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="product" className="py-24 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <span className="font-mono text-xs text-white/25 uppercase tracking-widest">
            HOW IT WORKS
          </span>
          <h2 className="mt-3 text-3xl font-semibold text-white/90 tracking-tight">
            Prompt. Generate. Close.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-white/[0.06]">
          {STEPS.map((step) => (
            <div key={step.n} className="bg-bg p-8">
              <div className="font-mono text-4xl font-bold text-white/[0.07] mb-6">
                {step.n}
              </div>
              <h3 className="text-lg font-semibold text-white/85 mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-white/45 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 border border-accent/20 bg-accent/[0.04] p-6">
          <p className="font-mono text-sm text-white/60 leading-relaxed">
            <span className="text-accent font-semibold">
              The test is this:
            </span>{" "}
            a user can generate a business and close their first paying SME
            client within 14 days without rewriting copy, repositioning the
            offer, or adjusting pricing. If they have to fix it manually — it is
            a tool, not a co-founder.
          </p>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="py-24 border-t border-white/[0.06] grid-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <span className="font-mono text-xs text-white/25 uppercase tracking-widest">
            OUTPUT
          </span>
          <h2 className="mt-3 text-3xl font-semibold text-white/90 tracking-tight">
            Six categories. One generation.
          </h2>
          <p className="mt-3 text-white/45 text-sm max-w-lg">
            Every output is tied to a real vertical, real market, real buyer. Not a template. Not a
            translation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06]">
          {FEATURES.map((f) => (
            <div
              key={f.label}
              className="bg-bg p-6 group hover:bg-surface transition-colors"
            >
              <div className="font-mono text-xs text-white/25 uppercase tracking-widest mb-4">
                {f.label}
              </div>
              <h3 className="text-base font-semibold text-white/85 mb-2 leading-snug">
                {f.title}
              </h3>
              <p className="text-sm text-white/45 leading-relaxed mb-4">
                {f.description}
              </p>
              <p className="font-mono text-xs text-accent/60 leading-relaxed italic">
                {f.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Markets() {
  return (
    <section id="markets" className="py-24 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="font-mono text-xs text-white/25 uppercase tracking-widest">
              LOCALIZATION
            </span>
            <h2 className="mt-3 text-3xl font-semibold text-white/90 tracking-tight">
              Not translated.
              <br />
              <span className="text-accent">Written native.</span>
            </h2>
            <p className="mt-6 text-white/50 text-sm leading-relaxed max-w-md">
              This is not a translation feature. It is the product. Swedish
              directness, German formality norms, Danish understatement — each
              market gets output that reads like a local wrote it, because a
              local&rsquo;s buyer expects exactly that.
            </p>
            <p className="mt-4 text-white/35 text-sm leading-relaxed max-w-md">
              If the output reads like translated English, the product fails on
              its own terms.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { label: "Languages", val: "5" },
                { label: "Payment systems", val: "Klarna, Swish, Vipps, MobilePay" },
                { label: "Compliance", val: "GDPR, VAT (Moms / MwSt)" },
                { label: "Phase 1 verticals", val: "Boutique fitness + padel" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="border border-white/[0.08] p-4 bg-surface"
                >
                  <div className="font-mono text-xs text-white/25 uppercase tracking-widest mb-1">
                    {item.label}
                  </div>
                  <div className="font-mono text-sm text-white/70">
                    {item.val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-px bg-white/[0.06]">
            {MARKETS.map((m) => (
              <div
                key={m.country}
                className="bg-bg px-6 py-5 flex items-start gap-4 hover:bg-surface transition-colors"
              >
                <span className="text-2xl leading-none mt-0.5">{m.flag}</span>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-sm text-white/80">
                      {m.country}
                    </span>
                    <span className="font-mono text-xs text-white/25 uppercase tracking-widest">
                      {m.lang}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-white/40 italic leading-relaxed">
                    &ldquo;{m.example}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const [currency, setCurrency] = useState<"sek" | "eur">("eur");

  const plans = [
    {
      name: "Operator",
      tagline: "One person. One market. Unlimited generation.",
      price: currency === "sek" ? "999 SEK" : "€89",
      period: "/month",
      features: [
        "Unlimited business generations",
        "All 6 output categories",
        "5 markets (SE, NO, DK, FI, DE)",
        "Native language output",
        "All Phase 1 verticals",
        "Updates as markets expand",
      ],
      cta: "Start for free",
      highlight: false,
    },
    {
      name: "Agency",
      tagline: "Multiple operators. White-label output.",
      price: currency === "sek" ? "2999 SEK" : "€269",
      period: "/month",
      features: [
        "Everything in Operator",
        "Multi-user seats",
        "White-label output",
        "Bulk generation",
        "Priority support",
        "Custom vertical requests",
      ],
      cta: "Contact us",
      highlight: true,
    },
  ];

  return (
    <section id="pricing" className="py-24 border-t border-white/[0.06] grid-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <span className="font-mono text-xs text-white/25 uppercase tracking-widest">
              PRICING
            </span>
            <h2 className="mt-3 text-3xl font-semibold text-white/90 tracking-tight">
              Simple. Operator-priced.
            </h2>
          </div>
          <div className="inline-flex border border-white/[0.08]">
            {(["eur", "sek"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`font-mono text-xs px-4 py-2 uppercase tracking-widest transition-colors ${
                  currency === c
                    ? "bg-accent text-bg"
                    : "text-white/40 hover:text-white/60"
                }`}
              >
                {c === "eur" ? "EUR" : "SEK"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-white/[0.06]">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`p-8 relative ${
                plan.highlight ? "bg-surface" : "bg-bg"
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-4 right-4">
                  <span className="font-mono text-xs text-bg bg-accent px-2 py-1 uppercase tracking-widest">
                    Popular
                  </span>
                </div>
              )}
              <div className="font-mono text-xs text-white/25 uppercase tracking-widest mb-2">
                {plan.name}
              </div>
              <p className="text-sm text-white/50 mb-6">{plan.tagline}</p>
              <div className="mb-8">
                <span className="text-4xl font-semibold text-white/90 tracking-tight">
                  {plan.price}
                </span>
                <span className="font-mono text-sm text-white/35 ml-1">
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="text-accent text-xs">✓</span>
                    <span className="text-sm text-white/55">{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#waitlist"
                className={`block text-center font-mono text-sm py-3 transition-colors ${
                  plan.highlight
                    ? "bg-accent text-bg hover:bg-accent/90"
                    : "border border-white/10 text-white/60 hover:border-white/20 hover:text-white/80"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="mt-6 font-mono text-xs text-white/25 text-center">
          Early access pricing. Locked for the duration of your subscription.
        </p>
      </div>
    </section>
  );
}

function Waitlist() {
  const [email, setEmail] = useState("");
  const [market, setMarket] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email && market) setSubmitted(true);
  }

  return (
    <section
      id="waitlist"
      className="py-24 border-t border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-lg mx-auto text-center">
          <span className="font-mono text-xs text-white/25 uppercase tracking-widest">
            EARLY ACCESS
          </span>
          <h2 className="mt-3 text-3xl font-semibold text-white/90 tracking-tight">
            Be operational this week.
          </h2>
          <p className="mt-4 text-white/45 text-sm leading-relaxed">
            Nils is in early access for Nordic and DACH operators. Join the
            waitlist and be first to generate your business.
          </p>

          {submitted ? (
            <div className="mt-10 border border-accent/30 bg-accent/[0.07] p-8">
              <div className="font-mono text-xs text-accent uppercase tracking-widest mb-2">
                You&rsquo;re on the list
              </div>
              <p className="text-sm text-white/55">
                We&rsquo;ll reach out when your market opens. In the meantime,
                think about your first vertical.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-surface border border-white/[0.08] px-4 py-3 font-mono text-sm text-white/80 placeholder:text-white/25 focus:outline-none focus:border-accent/40 transition-colors"
              />
              <select
                required
                value={market}
                onChange={(e) => setMarket(e.target.value)}
                className="w-full bg-surface border border-white/[0.08] px-4 py-3 font-mono text-sm text-white/80 focus:outline-none focus:border-accent/40 transition-colors appearance-none"
              >
                <option value="" disabled>
                  Your market
                </option>
                {MARKETS.map((m) => (
                  <option key={m.country} value={m.country}>
                    {m.flag} {m.country} — {m.lang}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="w-full bg-accent text-bg font-mono text-sm font-semibold py-3 hover:bg-accent/90 transition-colors"
              >
                Join waitlist
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="font-mono text-accent font-semibold text-sm">
              nils
            </span>
            <p className="mt-1 font-mono text-xs text-white/25 max-w-xs leading-relaxed">
              Complete business infrastructure for solo operators in Nordics and
              DACH.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2">
            <div className="flex items-center gap-1">
              <StatusDot status="active" />
              <span className="font-mono text-xs text-white/30">
                Early access — Phase 1
              </span>
            </div>
            <p className="font-mono text-xs text-white/20">
              &copy; {new Date().getFullYear()} Nils. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <HowItWorks />
      <Features />
      <Markets />
      <Pricing />
      <Waitlist />
      <Footer />
    </main>
  );
}
