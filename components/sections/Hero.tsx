import { BannerSlider } from "@/components/sections/BannerSlider";
import { getAllBanners } from "@/lib/services/banners.service";
import { getProductCount, formatProductCountClaim } from "@/lib/services/products.service";

export async function Hero() {
  const [banners, productCount] = await Promise.all([getAllBanners(), getProductCount()]);
  const countClaim = formatProductCountClaim(productCount);

  // The hero's own banner (b-1) carries the SEO-critical H1/subheading, so
  // its "100+ products" claim is kept honest against the real catalog size
  // instead of a hardcoded number baked into the static banner data.
  const heroBanners = banners.map((banner) =>
    banner.id === "b-1"
      ? {
          ...banner,
          eyebrow: `${countClaim} Products, 2-Hour Delivery`,
          subtitle: `Order fresh fish online in Dubai, UAE from ${countClaim} fresh and frozen products. Cleaned and cut your way, kept at 0 to 4°C, and delivered within 2 hours.`,
        }
      : banner
  );

  return <BannerSlider banners={heroBanners} />;
}
