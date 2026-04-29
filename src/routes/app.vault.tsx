import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/app/vault")({
  component: () => <ComingSoon title="Your Data Vault" intro="Sovereignty made visible. Per-category access logs, opt-in research marketplace with cashback, one-tap export." />,
});
