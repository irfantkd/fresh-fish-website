import { apiPost } from "@/lib/api-client";

export interface ContactMessageInput {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export async function submitContactMessage(input: ContactMessageInput) {
  return apiPost("/contact-messages", input);
}
