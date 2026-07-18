import { DELIVERY_AREAS } from "@/lib/data/delivery-areas.data";
import type { DeliveryArea } from "@/types";

export async function getDeliveryAreas(): Promise<DeliveryArea[]> {
  return DELIVERY_AREAS;
}
