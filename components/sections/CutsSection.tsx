import { MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations/FadeIn";
import { SITE_CONFIG } from "@/constants/site";

const CUTS = [
  { title: "Whole", description: "The full fish, as it is." },
  { title: "Cleaned", description: "Scaled and gutted, ready to cook." },
  { title: "Cut", description: "Steaks or pieces in the size you choose." },
  { title: "Fillet", description: "Boneless pieces, skin-on or skinless where the fish allows." },
  { title: "Custom", description: "Tell us the size, cut or weight." },
];

export function CutsSection() {
  return (
    <section className="bg-gray-50/60 py-20 sm:py-28">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Prepared Your Way"
            title="Every Fish, Cleaned and Cut the Way You Want It"
            description="All variations are available. Tell us how you like it and we prepare it before it leaves us."
          />
        </FadeIn>

        <Stagger className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CUTS.map((cut) => (
            <StaggerItem
              key={cut.title}
              className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-5"
            >
              <h3 className="font-heading text-base font-bold text-ocean-950">{cut.title}</h3>
              <p className="text-sm text-gray-500">{cut.description}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mt-6 text-sm text-gray-500">
          Add a note at checkout or message us on WhatsApp.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/blog" variant="outline">
            See Every Cut Explained
          </Button>
          <Button
            href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
          >
            <MessageCircle className="h-4 w-4" /> Order on WhatsApp
          </Button>
        </div>
      </Container>
    </section>
  );
}
