import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "./app.trajectory";

export const Route = createFileRoute("/app/settings")({
  component: () => <ComingSoon title="Settings & AI Transparency" intro="Profile, subscription, connections, granular consent toggles. AI Transparency lists every model with accuracy, fairness audits, and per-model opt-out." />,
});
