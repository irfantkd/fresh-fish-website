import { CalendarCheck, Layers, Snowflake, Timer } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations/FadeIn";
import { getProductCount, formatProductCountClaim } from "@/lib/services/products.service";

export async function TrustHighlights() {
  const countClaim = formatProductCountClaim(await getProductCount());

  const highlights = [
    { icon: CalendarCheck, value: "2018", label: "Serving Dubai since" },
    { icon: Layers, value: countClaim, label: "Fresh & frozen products" },
    { icon: Snowflake, value: "0–4°C", label: "Cold chain, always" },
    { icon: Timer, value: "2 hrs", label: "Express delivery in Dubai" },
  ];

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-ocean-50/60 to-white py-12 sm:py-16">
      <Container>
        <FadeIn>
          <Stagger className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {highlights.map((item) => (
              <StaggerItem
                key={item.label}
                className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-aqua-200 hover:shadow-lg hover:shadow-ocean-900/5"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-aqua-500/10 text-aqua-700 transition-transform duration-300 group-hover:scale-110">
                  <item.icon className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <div className="font-heading text-xl font-bold text-ocean-950 sm:text-2xl">
                    {item.value}
                  </div>
                  <div className="text-xs leading-snug text-gray-500 sm:text-sm">{item.label}</div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </FadeIn>
      </Container>
    </section>
  );
}
