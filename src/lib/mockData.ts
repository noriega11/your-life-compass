// Seeded mock data for the LONGEVA demo.
// All numbers below feed Recharts and the explainability panels, they are
// shaped to look realistic (not clinically accurate).

export const MOCK_USER = {
  firstName: "Maya",
  lifeScore: 782,
  lifeScoreLow: 758,
  lifeScoreHigh: 806,
  lifeScoreDelta: 4,
  health: 74,
  wealth: 68,
  mind: 81,
  bodyAge: 31.4,
  realAge: 34,
  streak: 12,
  league: "Silver II",
  longvBalance: 4280,
  season: { name: "Metabolic Spring", day: 34, total: 90 },
};

export const TODAY_ACTIONS = [
  {
    id: "a1",
    category: "Health",
    title: "Walk 20 min before your 11am meeting",
    outcome: "Lowers glucose variability, +0.04 healthy years",
    longv: 40,
    duration: 20,
    why: {
      summary:
        "We recommended a morning walk because your glucose variability has been trending high (84th percentile this week) and walking before breakfast has been shown to reduce it by 25% in similar users.",
      signals: [
        { name: "Glucose variability (CGM)", weight: 0.42 },
        { name: "Sedentary hours", weight: 0.27 },
        { name: "Calendar gap 10:30–11:00", weight: 0.18 },
        { name: "Past completion rate", weight: 0.13 },
      ],
      confidence: 0.81,
      modelVersion: "Kairos v4.1",
    },
  },
  {
    id: "a2",
    category: "Wealth",
    title: "Skip one delivery order this week, auto-route to IRA",
    outcome: "Adds $2,400 to retirement at 67",
    longv: 60,
    duration: 1,
    why: {
      summary:
        "You spent $186 on food delivery in the last 14 days. Redirecting one order keeps the same week of meals while compounding $34 over 33 years to roughly $2,400 at age 67.",
      signals: [
        { name: "Delivery spend (14d)", weight: 0.51 },
        { name: "Retirement gap", weight: 0.29 },
        { name: "Time horizon", weight: 0.20 },
      ],
      confidence: 0.88,
      modelVersion: "Purchase DNA v2.0",
    },
  },
  {
    id: "a3",
    category: "Mind",
    title: "8 minutes of breathwork before bed",
    outcome: "Improves sleep depth, protects healthspan",
    longv: 25,
    duration: 8,
    why: {
      summary:
        "Your average sleep latency was 28 min this week (target <15). Slow breathing for 8 minutes has been shown to halve sleep latency in similar users.",
      signals: [
        { name: "Sleep latency (Whoop)", weight: 0.46 },
        { name: "Evening HRV", weight: 0.31 },
        { name: "Stress score", weight: 0.23 },
      ],
      confidence: 0.74,
      modelVersion: "Kairos v4.1",
    },
  },
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
