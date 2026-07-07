"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { rooms } from "@/lib/data";

const bookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is too short"),
  checkIn: z.string().min(1, "Check-in date is required"),
  checkOut: z.string().min(1, "Check-out date is required"),
  guests: z.coerce.number().min(1).max(8),
  roomSlug: z.string().min(1),
  coupon: z.string().optional()
});

export async function createBooking(formData: FormData) {
  const data = Object.fromEntries(formData);
  const parsed = bookingSchema.safeParse(data);
  if (!parsed.success) {
    const errorMap = parsed.error.flatten().fieldErrors;
    const firstErrorMessage = Object.values(errorMap)[0]?.[0] || "Invalid booking data.";
    return { ok: false, message: firstErrorMessage };
  }

  const { name, email, phone, checkIn, checkOut, guests, roomSlug, coupon } = parsed.data;

  const selectedRoom = rooms.find((r) => r.slug === roomSlug);
  if (!selectedRoom) {
    return { ok: false, message: "The selected room was not found." };
  }

  // Calculate pricing
  const basePrice = selectedRoom.price;
  const weekendAdd = 2800;
  const extraGuestFee = Math.max(0, guests - 2) * 1800;
  let totalAmount = basePrice + weekendAdd + extraGuestFee;

  // Process Coupon
  let discountPercent = 0;
  if (coupon) {
    if (prisma) {
      try {
        const activeCoupon = await prisma.coupon.findUnique({
          where: { code: coupon }
        });
        if (activeCoupon && activeCoupon.active) {
          discountPercent = activeCoupon.percent / 100;
        } else if (coupon.toUpperCase() === "TEHRI10") {
          discountPercent = 0.1;
        }
      } catch {
        if (coupon.toUpperCase() === "TEHRI10") {
          discountPercent = 0.1;
        }
      }
    } else {
      if (coupon.toUpperCase() === "TEHRI10") {
        discountPercent = 0.1;
      }
    }
  }

  totalAmount = Math.round(totalAmount * (1 - discountPercent));

  // Write booking transactions to database
  if (prisma) {
    try {
      let dbRoom = await prisma.room.findUnique({
        where: { slug: roomSlug }
      });

      if (!dbRoom) {
        dbRoom = await prisma.room.create({
          data: {
            slug: roomSlug,
            name: selectedRoom.name,
            description: selectedRoom.tone,
            price: selectedRoom.price
          }
        });
      }

      const booking = await prisma.booking.create({
        data: {
          roomId: dbRoom.id,
          guestName: name,
          email,
          phone,
          checkIn: new Date(checkIn),
          checkOut: new Date(checkOut),
          guests,
          total: totalAmount,
          status: "PENDING"
        }
      });

      return {
        ok: true,
        message: `Reservation requested successfully. Ref ID: ${booking.id}`,
        bookingId: booking.id,
        total: totalAmount
      };
    } catch (error) {
      console.warn("Database offline. Falling back to memory reservation:", error);
      const mockRefId = `res_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      return {
        ok: true,
        message: `Reservation requested (Simulated). Ref ID: ${mockRefId}`,
        bookingId: mockRefId,
        total: totalAmount,
        isSimulated: true
      };
    }
  } else {
    // Graceful offline fallback
    const mockRefId = `res_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    return {
      ok: true,
      message: `Reservation requested (Simulated). Ref ID: ${mockRefId}`,
      bookingId: mockRefId,
      total: totalAmount,
      isSimulated: true
    };
  }
}
