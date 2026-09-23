import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/animations/FadeIn";

const STATS = ["Since 2020", "100+ products", "0 to 4°C cold chain", "2-hour express in Dubai"];

export function OpeningParagraph() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-4xl">
        <FadeIn>
          <h2 className="text-balance text-center font-heading text-2xl font-bold text-ocean-950 sm:text-3xl">
            Fresh Fish Dubai: Your Online Fish and Seafood Shop in Dubai, UAE
          </h2>
          <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg">
            Fresh Fish Dubai is an online fish and seafood shop with a{" "}
            <Link href="/contact" className="font-semibold text-aqua-700 hover:underline">
              physical store at Waterfront Market
            </Link>
            , serving Dubai since 2020. We sell{" "}
            <Link href="/shop" className="font-semibold text-aqua-700 hover:underline">
              more than 100 products
            </Link>
            , both{" "}
            <Link href="/shop" className="font-semibold text-aqua-700 hover:underline">
              fresh
            </Link>{" "}
            and{" "}
            <Link href="/shop" className="font-semibold text-aqua-700 hover:underline">
              frozen
            </Link>
            , from Gulf favourites like hamour and kingfish to salmon, prawns, lobster and crab.
            We source our catch daily and keep it in a{" "}
            <Link href="/blog" className="font-semibold text-aqua-700 hover:underline">
              temperature-controlled cold chain at 0 to 4&deg;C
            </Link>
            . Every order is precisely weighed, cleaned and timestamp-verified, and cut to your
            choice: whole, cleaned, steak or fillet. Express delivery reaches every area of
            Dubai, UAE within 2 hours, and we{" "}
            <Link href="/delivery-areas" className="font-semibold text-aqua-700 hover:underline">
              deliver to the other emirates
            </Link>{" "}
            too. Order 24/7 and pay cash on delivery.
          </p>
        </FadeIn>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat}
              className="rounded-2xl border border-gray-100 bg-gray-50/60 px-4 py-3 text-center"
            >
              <span className="font-heading text-sm font-bold text-ocean-950 sm:text-base">
                {stat}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
