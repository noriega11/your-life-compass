import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/app/recommended")({
  component: () => <ComingSoon title="Recommended for You" intro="Airbnb-style browse of food, movement, recovery, mind, finance, and medical providers — each scored for your gaps." />,
});
