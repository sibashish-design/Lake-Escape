"use server";

import { z } from "zod";

const bookingSchema = z.object({
  checkIn: z.string().min(1),
  checkOut: z.string().min(1),
  guests: z.coerce.number().min(1).max(8),
  roomSlug: z.string().min(1),
  coupon: z.string().optional()
});

export async function createBooking(formData: FormData) {
  const parsed = bookingSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, message: "Please check booking details." };
  }

  return {
    ok: true,
    message: "Booking request prepared for payment.",
    data: parsed.data
  };
}
