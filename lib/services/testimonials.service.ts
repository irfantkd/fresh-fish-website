import { TESTIMONIALS } from "@/lib/data/testimonials.data";
import type { Testimonial } from "@/types";

export async function getTestimonials(): Promise<Testimonial[]> {
  return TESTIMONIALS;
}
