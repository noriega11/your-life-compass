import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "./app.trajectory";

export const Route = createFileRoute("/app/guardrails")({
  component: () => <ComingSoon title="Purchase Guardrails + LONGEVA Card" intro="Three-tier rules: gentle reminder, 60-second pause, hard block. Saves you from yourself." />,
});
