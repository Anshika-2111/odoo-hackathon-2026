import { createFileRoute } from "@tanstack/react-router";
import { HeroPanel } from "@/components/HeroPanel";
import { SignupForm } from "@/components/SignupForm";

export const Route = createFileRoute("/")({
  component: SignupPage,
  head: () => ({
    meta: [
      { title: "Sign up · Traveloop — Plan smarter. Travel together." },
      { name: "description", content: "Create your Traveloop account and start planning multi-city trips, day-wise itineraries, and shared budgets in minutes." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap" },
    ],
  }),
});

function SignupPage() {
  return (
    <main className="min-h-screen w-full" style={{ backgroundImage: "var(--gradient-soft)" }}>
      <div className="mx-auto max-w-7xl lg:p-6">
        <div className="grid lg:grid-cols-2 gap-0 lg:gap-8 min-h-screen lg:min-h-[calc(100vh-3rem)]">
          <section className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
            <HeroPanel />
          </section>
          <section className="flex items-center justify-center py-10 px-5 sm:px-8 lg:py-14">
            <SignupForm />
          </section>
        </div>
      </div>
    </main>
  );
}
