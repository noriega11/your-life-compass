import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { ArrowLeft, Lock } from "lucide-react";

export const Route = createFileRoute("/signup")({ component: SignupPage });

function SignupPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signUp(email, password, fullName);
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Account created, let's build your forecast.");
    navigate({ to: "/onboarding" });
  };

  return (
    <div className="min-h-screen bg-background grid place-items-center p-6">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-10">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <div className="mb-10">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-lime mb-2">12 minutes to your forecast</p>
          <h1 className="font-display text-5xl">Create your account.</h1>
        </div>
        <form onSubmit={submit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="h-12" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="h-12" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="h-12" />
          </div>
          <Button variant="lime" size="lg" className="w-full" disabled={loading}>
            {loading ? "Creating…" : "Create account & start"}
          </Button>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5 justify-center">
            <Lock className="h-3 w-3" /> Encrypted. Revocable. Never sold.
          </p>
        </form>
        <p className="text-sm text-muted-foreground mt-6 text-center">
          Already have one? <Link to="/login" className="text-lime hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
