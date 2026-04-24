import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "./app.trajectory";

export const Route = createFileRoute("/app/progress")({
  component: () => <ComingSoon title="Your Progress Tree" intro="An animated tree where each branch is a sustained habit and each leaf is a milestone. Screenshot-worthy." />,
});
