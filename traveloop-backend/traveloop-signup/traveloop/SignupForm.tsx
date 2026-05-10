import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type Errors = Partial<Record<"name" | "email" | "password" | "confirm" | "terms", string>>;

export function SignupForm() {
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [terms, setTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [values, setValues] = useState({ name: "", email: "", password: "", confirm: "" });

  const update = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!values.name.trim()) e.name = "Please enter your full name.";
    if (!values.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = "Enter a valid email address.";
    if (!values.password) e.password = "Password is required.";
    else if (values.password.length < 8) e.password = "Password must be at least 8 characters.";
    if (!values.confirm) e.confirm = "Please confirm your password.";
    else if (values.confirm !== values.password) e.confirm = "Passwords do not match.";
    if (!terms) e.terms = "You must accept the terms to continue.";
    return e;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setSubmitting(true);
    setTimeout(() => setSubmitting(false), 1200);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-3xl bg-card border border-border/60 shadow-[var(--shadow-card)] p-7 sm:p-9 backdrop-blur">
        <div className="mb-7">
          <h2 className="font-display text-2xl sm:text-[1.7rem] font-semibold tracking-tight text-foreground">
            Create your Traveloop account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Start planning your perfect trip in minutes.
          </p>
        </div>

        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <Field
            id="name" label="Full name" icon={<User className="h-4 w-4" />}
            placeholder="Ada Lovelace" value={values.name} onChange={update("name")}
            error={errors.name} autoComplete="name"
          />
          <Field
            id="email" type="email" label="Email" icon={<Mail className="h-4 w-4" />}
            placeholder="you@example.com" value={values.email} onChange={update("email")}
            error={errors.email} autoComplete="email"
          />

          <PasswordField
            id="password" label="Password" placeholder="At least 8 characters"
            value={values.password} onChange={update("password")} error={errors.password}
            visible={show} onToggle={() => setShow((s) => !s)} autoComplete="new-password"
          />
          <PasswordField
            id="confirm" label="Confirm password" placeholder="Re-enter password"
            value={values.confirm} onChange={update("confirm")} error={errors.confirm}
            visible={showConfirm} onToggle={() => setShowConfirm((s) => !s)} autoComplete="new-password"
          />

          <div className="pt-1">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <Checkbox
                checked={terms}
                onCheckedChange={(c) => { setTerms(!!c); setErrors((e) => ({ ...e, terms: undefined })); }}
                className="mt-0.5"
              />
              <span className="text-sm text-muted-foreground leading-relaxed">
                I agree to Traveloop's{" "}
                <a href="#" className="text-primary font-medium hover:underline">Terms</a> and{" "}
                <a href="#" className="text-primary font-medium hover:underline">Privacy Policy</a>.
              </span>
            </label>
            {errors.terms && <p className="mt-1.5 text-xs text-destructive">{errors.terms}</p>}
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full h-11 rounded-xl text-[0.95rem] font-semibold shadow-[var(--shadow-soft)] bg-[var(--gradient-brand)] hover:opacity-95 transition"
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Account"}
          </Button>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-card px-3 text-xs uppercase tracking-wider text-muted-foreground">
                or continue with
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full h-11 rounded-xl font-medium gap-2.5 hover:bg-secondary/60 transition"
          >
            <GoogleIcon />
            Sign up with Google
          </Button>

          <p className="text-center text-sm text-muted-foreground pt-2">
            Already have an account?{" "}
            <a href="#" className="text-primary font-semibold hover:underline">Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
}

function Field({
  id, label, icon, error, type = "text", ...rest
}: {
  id: string; label: string; icon?: React.ReactNode; error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <Label htmlFor={id} className="text-sm font-medium text-foreground mb-1.5 block">{label}</Label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </span>
        )}
        <Input
          id={id} type={type}
          className={`h-11 rounded-xl bg-background/80 ${icon ? "pl-10" : ""} ${error ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
          {...rest}
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function PasswordField({
  id, label, value, onChange, error, visible, onToggle, placeholder, autoComplete,
}: {
  id: string; label: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string; visible: boolean; onToggle: () => void;
  placeholder?: string; autoComplete?: string;
}) {
  return (
    <div>
      <Label htmlFor={id} className="text-sm font-medium text-foreground mb-1.5 block">{label}</Label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Lock className="h-4 w-4" />
        </span>
        <Input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`h-11 rounded-xl bg-background/80 pl-10 pr-11 ${error ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
        />
        <button
          type="button"
          onClick={onToggle}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.3 0-9.7-3.4-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.6l6.2 5.2C41.4 35.6 44 30.2 44 24c0-1.2-.1-2.3-.4-3.5z"/>
    </svg>
  );
}
