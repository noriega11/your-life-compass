import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "./app.trajectory";

export const Route = createFileRoute("/app/spending")({
  component: () => <ComingSoon title="Your Spending Impact" intro="How your money shapes your life — every transaction scored on metabolic, mental, financial, and environmental axes." />,
});
