import { BANNERS } from "@/lib/data/banners.data";
import type { Banner } from "@/types";

export async function getAllBanners(): Promise<Banner[]> {
  return BANNERS;
}
