import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Sparkles, Filter, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RECOMMENDED_MERCHANTS } from "@/lib/mockData";

export const Route = createFileRoute("/app/recommended")({ component: Recommended });

const CATEGORIES = ["All", "Food", "Movement", "Recovery", "Mind", "Medical"];

function Recommended() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? RECOMMENDED_MERCHANTS : RECOMMENDED_MERCHANTS.filter((m) => m.category === active);

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-teal">Recommended for you</p>
        <h1 className="font-display text-5xl text-balance">Smarter spending. Better forecast.</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Cheaper grocery alternatives, meal-prep replacing delivery, lower-cost fitness, subscription cancellations, and insurance-linked rewards. No paid placements.
        </p>
      </header>

      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search providers, gyms, clinics, restaurants…" className="pl-9 h-11" />
        </div>
        <Button variant="outline" size="lg"><Filter className="h-4 w-4" /> Filters</Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap border transition-colors ${
              active === c ? "bg-foreground text-background border-foreground" : "border-border hover:bg-accent"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((m) => (
          <motion.div
            key={m.id}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col"
          >
            <div className="aspect-[4/3] relative overflow-hidden">
              <img src={m.image} alt={m.name} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur text-[10px] font-mono uppercase tracking-wider">
                {m.category}
              </div>
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-teal/90 text-white text-[10px] font-mono uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> +{m.impact}% fit
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-display text-xl mb-1">{m.name}</h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                <MapPin className="h-3 w-3" /> {m.distance} · {m.price}
              </div>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-xs font-mono text-gold">+{m.longv} LONGV</span>
                <Button size="sm" variant="outline">View</Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
