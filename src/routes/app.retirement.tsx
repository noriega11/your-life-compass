import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/app/retirement")({
  component: () => <ComingSoon title="Auto-Save for Retirement" intro="Net worth at 67, 75, 85 with confidence bands. Auto-routing rules. 'Retire sooner' simulator." />,
});
