import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "./app.trajectory";

export const Route = createFileRoute("/app/coach")({
  component: () => <ComingSoon title="Your AI Coach (Kairos)" intro="Chat with your coach. Every answer ends with 'Why I said this →' so you always see the rationale." />,
});
