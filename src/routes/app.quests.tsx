import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "./app.trajectory";

export const Route = createFileRoute("/app/quests")({
  component: () => <ComingSoon title="Quests, Streaks & LONGV Wallet" intro="90-day seasons. Active quests. Anonymous leagues. Pacts with friends. Redeem LONGV for cashback, IRA top-ups, or insurance credits." />,
});
