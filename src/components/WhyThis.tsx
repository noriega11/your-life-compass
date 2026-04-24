import { useState } from "react";
import { Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface WhyThisData {
  summary: string;
  signals: { name: string; weight: number }[];
  confidence: number;
  modelVersion: string;
}

interface Props {
  data: WhyThisData;
  label?: string;
  className?: string;
}

/**
 * Reusable explainability panel — every AI output in LONGEVA gets one.
 * Click "Why this?" to see the top signals, weights, confidence, and model
 * version. This is a non-negotiable part of the product.
 */
export function WhyThis({ data, label = "Why this?", className }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-lime transition-colors",
          className,
        )}
      >
        <Info className="h-3.5 w-3.5" />
        {label}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 24, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-t-3xl sm:rounded-3xl max-w-lg w-full p-7 shadow-card max-h-[90vh] overflow-auto"
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-lime mb-1">
                    Explainability
                  </p>
                  <h3 className="font-display text-2xl">Why we said this</h3>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full p-1.5 hover:bg-muted transition-colors"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="text-sm text-foreground/90 leading-relaxed mb-6">{data.summary}</p>

              <div className="mb-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                  Top signals
                </p>
                <div className="space-y-3">
                  {data.signals.map((s) => (
                    <div key={s.name}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span>{s.name}</span>
                        <span className="font-mono text-muted-foreground">
                          {Math.round(s.weight * 100)}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${s.weight * 100}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full bg-lime"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-5 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground">Confidence</p>
                  <p className="font-mono text-lg">{Math.round(data.confidence * 100)}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Model</p>
                  <p className="font-mono text-lg">{data.modelVersion}</p>
                </div>
              </div>

              <button
                className="mt-6 text-xs text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setOpen(false)}
              >
                This doesn't fit me → tell the model
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
