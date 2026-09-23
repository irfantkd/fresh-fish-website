import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";

const FISH = [
  {
    name: "Hamour",
    arabic: "هامور",
    alsoCalled: "Grouper",
    scientificName: "Epinephelus coioides",
    family: "Serranidae",
    greatFor: "Grilling, baking, curry",
  },
  {
    name: "Kingfish",
    arabic: "كنعد",
    alsoCalled: "Kanad, seerfish",
    scientificName: "Scomberomorus commerson",
    family: "Scombridae",
    greatFor: "Steaks, frying, grilling",
  },
  {
    name: "Sheri",
    arabic: "شعري",
    alsoCalled: "Emperor fish",
    scientificName: "Lethrinus nebulosus",
    family: "Lethrinidae",
    greatFor: "Grilling, frying",
  },
  {
    name: "Safi",
    arabic: "صافي",
    alsoCalled: "Rabbitfish",
    scientificName: "Siganus canaliculatus",
    family: "Siganidae",
    greatFor: "Frying, grilling",
  },
];

export function FishNamesSection() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Know Your Catch"
            title="Hamour, Kanad, Sheri and Safi: Fish Names Explained"
            description="Not sure what to order? Here is what these Gulf favourites are called, and how to cook them."
          />
        </FadeIn>

        {/* Desktop table */}
        <div className="mt-10 hidden overflow-x-auto rounded-3xl border border-gray-100 md:block">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-100 bg-gray-50/60 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Fish</th>
                <th className="px-5 py-3 font-semibold">Arabic</th>
                <th className="px-5 py-3 font-semibold">Also called</th>
                <th className="px-5 py-3 font-semibold">Scientific name</th>
                <th className="px-5 py-3 font-semibold">Family</th>
                <th className="px-5 py-3 font-semibold">Great for</th>
                <th className="px-5 py-3 font-semibold">Shop</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {FISH.map((fish) => (
                <tr key={fish.name}>
                  <td className="px-5 py-4 font-heading font-bold text-ocean-950">{fish.name}</td>
                  <td className="px-5 py-4 text-gray-600" dir="rtl" lang="ar">
                    {fish.arabic}
                  </td>
                  <td className="px-5 py-4 text-gray-500">{fish.alsoCalled}</td>
                  <td className="px-5 py-4 italic text-gray-500">{fish.scientificName}</td>
                  <td className="px-5 py-4 text-gray-500">{fish.family}</td>
                  <td className="px-5 py-4 text-gray-500">{fish.greatFor}</td>
                  <td className="px-5 py-4">
                    <Link href="/shop" className="font-semibold text-aqua-700 hover:underline">
                      Shop {fish.name}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="mt-10 flex flex-col gap-4 md:hidden">
          {FISH.map((fish) => (
            <div key={fish.name} className="rounded-2xl border border-gray-100 p-5">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-heading text-lg font-bold text-ocean-950">{fish.name}</h3>
                <span className="text-lg text-gray-500" dir="rtl" lang="ar">
                  {fish.arabic}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Also called <span className="text-ocean-900">{fish.alsoCalled}</span>
              </p>
              <p className="mt-1 text-sm italic text-gray-400">{fish.scientificName}</p>
              <p className="mt-1 text-sm text-gray-500">Family: {fish.family}</p>
              <p className="mt-1 text-sm text-gray-500">Great for: {fish.greatFor}</p>
              <Link
                href="/shop"
                className="mt-3 inline-block text-sm font-semibold text-aqua-700 hover:underline"
              >
                Shop {fish.name}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/blog" className="font-semibold text-aqua-700 hover:underline">
            Fish names in Arabic and English
          </Link>
          <Link href="/blog" className="font-semibold text-aqua-700 hover:underline">
            Hamour or grouper? Read the guide
          </Link>
        </div>
      </Container>
    </section>
  );
}
