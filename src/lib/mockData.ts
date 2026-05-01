// Seeded mock data for the LONGEVA demo.
// All numbers below feed Recharts and the explainability panels, they are
// shaped to look realistic (not clinically accurate).

export const MOCK_USER = {
  firstName: "Maya",
  lifeScore: 782,
  lifeScoreLow: 758,
  lifeScoreHigh: 806,
  lifeScoreDelta: 4,
  // Composite scores
  wealthScore: 68,
  vitalityScore: 74,
  mindScore: 81,
  retirementReadiness: 61, // %
  // Body, secondary
  bodyAge: 31.4,
  realAge: 34,
  // Money, primary
  income: 95000,
  monthlySpend: 4850,
  impulseLeakage: 620, // $/mo
  retirementBalance: 38000,
  retirementGap: -428000,
  savingsRate: 7, // %
  targetSavingsRate: 15,
  autoSavedThisMonth: 312,
  guardrailSavings: 187,
  leakageReduced: 22, // %
  netWorthCurrent67: 740000,
  netWorthOptimized67: 1080000,
  emergencyRunwayMonths: 2.4,
  debtPressure: 18, // % of income
  // Engagement
  streak: 12,
  league: "Silver II",
  longvBalance: 4280,
  season: { name: "Wealth Forecast Q2", day: 34, total: 90 },
  // Back-compat aliases used by existing components
  health: 74,
  wealth: 68,
  mind: 81,
};

export const TODAY_ACTIONS = [
  {
    id: "a1",
    category: "Auto-Save",
    title: "Move $47 from unused dining budget into IRA",
    outcome: "+$2,400 projected at 67 · closes 0.6% of retirement gap",
    longv: 60,
    duration: 1,
    dollars: 47,
    retirementImpact: 2400,
    why: {
      summary:
        "Your dining budget has $47 unused this week. Routing it now compounds to ~$2,400 at 67 and closes a measurable slice of your $428K retirement gap.",
      signals: [
        { name: "Unused dining budget", weight: 0.44 },
        { name: "Retirement gap velocity", weight: 0.31 },
        { name: "33-year compounding window", weight: 0.25 },
      ],
      confidence: 0.88,
      modelVersion: "Wealth Engine v1.4",
    },
  },
  {
    id: "a2",
    category: "Guardrail",
    title: "Set a $90 weekly delivery cap",
    outcome: "Avg savings $112/wk → $5,800/yr to emergency fund",
    longv: 80,
    duration: 1,
    dollars: 112,
    retirementImpact: 5800,
    why: {
      summary:
        "You spent $186/wk on delivery on average. Capping at $90/wk redirects ~$112 weekly with minimal lifestyle change.",
      signals: [
        { name: "Delivery spend (28d)", weight: 0.48 },
        { name: "Late-night order frequency", weight: 0.27 },
        { name: "Sleep ↔ impulse correlation", weight: 0.25 },
      ],
      confidence: 0.85,
      modelVersion: "Purchase DNA v2.0",
    },
  },
  {
    id: "a3",
    category: "Guardrail",
    title: "Pause late-night purchases after 9 PM",
    outcome: "60-second cool-off · est. $74/mo retained",
    longv: 40,
    duration: 1,
    dollars: 74,
    retirementImpact: 1880,
    why: {
      summary:
        "62% of your reversed purchases last quarter happened after 9 PM. A 60-second pause cuts this category by ~70% in similar users.",
      signals: [
        { name: "After-9pm reversal rate", weight: 0.52 },
        { name: "HRV-based stress signal", weight: 0.26 },
        { name: "Cohort baseline", weight: 0.22 },
      ],
      confidence: 0.79,
      modelVersion: "Kairos v4.1",
    },
  },
  {
    id: "a4",
    category: "Subscriptions",
    title: "Cancel 2 unused subscriptions",
    outcome: "$38/mo recovered → routed to IRA automatically",
    longv: 30,
    duration: 2,
    dollars: 38,
    retirementImpact: 1980,
    why: {
      summary:
        "Two subscriptions ($21 + $17) had no usage in the last 60 days. Canceling now recovers $456/yr that compounds to ~$1,980 at 67.",
      signals: [
        { name: "Subscription usage logs", weight: 0.58 },
        { name: "Renewal date proximity", weight: 0.24 },
        { name: "Category overlap", weight: 0.18 },
      ],
      confidence: 0.92,
      modelVersion: "Subscription Audit v1.1",
    },
  },
  {
    id: "a5",
    category: "Review",
    title: "Review $186 in impulse transactions",
    outcome: "Approve, refund, or block — 4 min",
    longv: 25,
    duration: 4,
    dollars: 186,
    retirementImpact: 0,
    why: {
      summary:
        "Five transactions this week were flagged as impulse (high-velocity, off-pattern, late-night). Reviewing them tunes your guardrails.",
      signals: [
        { name: "Velocity anomaly", weight: 0.41 },
        { name: "Off-pattern merchant", weight: 0.34 },
        { name: "Time-of-day signal", weight: 0.25 },
      ],
      confidence: 0.76,
      modelVersion: "Purchase DNA v2.0",
    },
  },
];

export const FINANCIAL_PATTERNS = [
  {
    id: "p1",
    title: "Your weekend spending rises 34% after short-sleep weeks",
    behavior: "Sub-6h sleep on 3+ weeknights",
    action: "Enable a $120 weekend discretionary cap on low-sleep weeks",
    dollars: 142,
    confidence: 0.81,
    range: "$110–$170/mo",
  },
  {
    id: "p2",
    title: "Weeks with 3+ workouts correlate with 18% higher savings consistency",
    behavior: "Movement frequency",
    action: "Tie auto-save bonus to your weekly workout streak",
    dollars: 96,
    confidence: 0.74,
    range: "$70–$120/mo",
  },
  {
    id: "p3",
    title: "Stress-heavy workdays predict +28% delivery and shopping spend",
    behavior: "Calendar density + low HRV",
    action: "Pre-stage a meal-prep plan on heavy-meeting days",
    dollars: 188,
    confidence: 0.83,
    range: "$150–$220/mo",
  },
  {
    id: "p4",
    title: "Late-night screen time correlates with next-day impulse purchases",
    behavior: "Screen >11pm on phone",
    action: "Auto-engage 60-sec pause on next-day discretionary spend",
    dollars: 74,
    confidence: 0.69,
    range: "$50–$95/mo",
  },
];

export const HEALTH_WEALTH_TRADEOFFS = [
  { id: "t1", tension: "Saving more, sleeping less", detail: "Extra freelance hours added $640/mo income but cut sleep to 5.8h.", verdict: "Net negative: future medical-cost risk +$2.3K/yr." },
  { id: "t2", tension: "Working longer, stress-spending more", detail: "Overtime weeks correlate with +$210 in delivery and impulse buys.", verdict: "Net negative: erases ~70% of the income gain." },
  { id: "t3", tension: "Cutting food costs, worsening nutrition", detail: "Switched to $4 lunches. Glucose variability +18% in 30 days.", verdict: "Risk: long-term healthcare-cost pressure." },
  { id: "t4", tension: "Spending on fitness, reducing future cost risk", detail: "$215/mo Equinox correlates with -$840/yr projected medical risk.", verdict: "Net positive: 4× ROI over 10 years." },
];

// Deterministic pseudo-noise so SSR and client renders match (no Math.random()).
const _noise = (i: number, seed: number) => ((Math.sin(i * 12.9898 + seed) * 43758.5453) % 1 + 1) % 1;
export const TRAJECTORY_DATA = Array.from({ length: 60 }, (_, i) => {
  const age = 34 + i;
  const current = 100 - Math.max(0, (age - 60) * 2.4) - _noise(i, 1.7) * 2;
  const optimized = 100 - Math.max(0, (age - 72) * 1.6) - _noise(i, 4.3) * 1.5;
  return {
    age,
    current: Math.max(20, Math.round(current)),
    optimized: Math.max(30, Math.round(optimized)),
    optimizedLow: Math.max(25, Math.round(optimized - 6)),
    optimizedHigh: Math.min(100, Math.round(optimized + 6)),
  };
});

export const RETIREMENT_DATA = [
  { age: 35, base: 80, longeva: 80 },
  { age: 40, base: 145, longeva: 198 },
  { age: 45, base: 230, longeva: 365 },
  { age: 50, base: 340, longeva: 580 },
  { age: 55, base: 470, longeva: 850 },
  { age: 60, base: 620, longeva: 1180 },
  { age: 67, base: 820, longeva: 1620 },
];

export const RECENT_TRANSACTIONS = [
  { id: 1, merchant: "Whole Foods", amount: 84.20, date: "Today", impact: "good", scores: { metabolic: 8, mental: 6, financial: 5, environmental: 7 }, healthHours: +1.2 },
  { id: 2, merchant: "DoorDash", amount: 34.10, date: "Yesterday", impact: "blocked", scores: { metabolic: 2, mental: 4, financial: 3, environmental: 3 }, healthHours: -2.1 },
  { id: 3, merchant: "Equinox", amount: 215.00, date: "Mon", impact: "good", scores: { metabolic: 9, mental: 8, financial: 6, environmental: 7 }, healthHours: +6.4 },
  { id: 4, merchant: "Trader Joe's", amount: 62.40, date: "Sun", impact: "good", scores: { metabolic: 7, mental: 6, financial: 7, environmental: 6 }, healthHours: +0.9 },
  { id: 5, merchant: "Sweetgreen", amount: 18.50, date: "Sat", impact: "neutral", scores: { metabolic: 7, mental: 6, financial: 5, environmental: 7 }, healthHours: +0.4 },
  { id: 6, merchant: "Uber", amount: 12.80, date: "Sat", impact: "neutral", scores: { metabolic: 4, mental: 5, financial: 4, environmental: 3 }, healthHours: -0.2 },
];

export const RECOMMENDED_MERCHANTS = [
  { id: "m1", name: "Cold Plunge SF", category: "Recovery", impact: 12, longv: 80, distance: "0.8 mi", price: "$$", image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80" },
  { id: "m2", name: "Function Health", category: "Medical", impact: 18, longv: 150, distance: "Online", price: "$$$", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80" },
  { id: "m3", name: "Souvla", category: "Food", impact: 6, longv: 30, distance: "1.2 mi", price: "$$", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80" },
  { id: "m4", name: "Reformation Pilates", category: "Movement", impact: 10, longv: 60, distance: "0.4 mi", price: "$$", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80" },
  { id: "m5", name: "Headspace+", category: "Mind", impact: 8, longv: 45, distance: "App", price: "$", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80" },
];

export const QUESTS = [
  { id: "q1", title: "Walk 80,000 steps this week", category: "Health", progress: 64, longv: 200, why: "Closes a 12% gap to your top healthspan driver." },
  { id: "q2", title: "Cap delivery spend at $80", category: "Wealth", progress: 48, longv: 180, why: "Average savings: $112/wk routed to your IRA." },
  { id: "q3", title: "Sleep before midnight 5x", category: "Mind", progress: 80, longv: 120, why: "Each early night adds 0.02 healthy years." },
];

export const GUARDRAIL_LOG = [
  { id: 1, action: "Blocked", merchant: "DoorDash", amount: 34, date: "Tue", saved: "$34 + 2.1 healthspan hrs" },
  { id: 2, action: "Nudged", merchant: "Total Wine", amount: 58, date: "Sat", saved: "Reduced order by $22" },
  { id: 3, action: "Blocked", merchant: "Amazon (electronics)", amount: 199, date: "Last wk", saved: "$199 → savings" },
];

export const AI_MODELS = [
  { id: "kairos", name: "Kairos Coach", version: "v4.1", description: "Generates daily prescriptions and explains rationale.", accuracy: 0.84, lastUpdated: "2 weeks ago", fairness: 0.96 },
  { id: "bioclock", name: "BioClock", version: "v3.2", description: "Estimates body age from facial biomarkers (on-device).", accuracy: 0.79, lastUpdated: "1 month ago", fairness: 0.93 },
  { id: "purchase", name: "Purchase DNA", version: "v2.0", description: "Scores transactions across health, wealth, mind, environment.", accuracy: 0.88, lastUpdated: "3 weeks ago", fairness: 0.95 },
  { id: "lifescore", name: "LifeScore", version: "v5.0", description: "Survival-analysis blended forecast with 80% confidence bands.", accuracy: 0.81, lastUpdated: "1 week ago", fairness: 0.94 },
];

export const PROVIDERS = {
  banks: [
    { id: "plaid", name: "Plaid", color: "#1A1F36" },
    { id: "chase", name: "Chase" },
    { id: "bofa", name: "Bank of America" },
    { id: "wells", name: "Wells Fargo" },
    { id: "amex", name: "Amex" },
    { id: "capital", name: "Capital One" },
  ],
  investments: [
    { id: "fidelity", name: "Fidelity" },
    { id: "vanguard", name: "Vanguard" },
    { id: "schwab", name: "Schwab" },
    { id: "robinhood", name: "Robinhood" },
  ],
  wearables: [
    { id: "apple", name: "Apple Health" },
    { id: "google", name: "Google Health" },
    { id: "oura", name: "Oura" },
    { id: "whoop", name: "Whoop" },
    { id: "garmin", name: "Garmin" },
    { id: "fitbit", name: "Fitbit" },
    { id: "withings", name: "Withings" },
    { id: "dexcom", name: "Dexcom" },
    { id: "function", name: "Function Health" },
  ],
};
