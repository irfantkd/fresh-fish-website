import { BannerSlider } from "@/components/sections/BannerSlider";
import { getAllBanners } from "@/lib/services/banners.service";

export async function Hero() {
  const banners = await getAllBanners();

  return <BannerSlider banners={banners} />;
}
