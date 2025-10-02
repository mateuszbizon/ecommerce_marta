import OrderConfirmEmail from "@/components/emails/OrderConfirmEmail";
import { resend } from "../resend";
import { ADMIN_EMAIL } from "@/constants";

type OrderMailProps = {
  orderNumber: string;
  customerEmail: string;
  customerName: string;
  total: number;
};

export async function sendOrderConfirmation({ orderNumber, customerEmail, customerName, total }: OrderMailProps) {
  try {
    // do klienta
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: customerEmail,
      subject: `Potwierdzenie zamówienia #${orderNumber}`,
      react: OrderConfirmEmail({
        orderNumber,
        totalPrice: total,
        customerName
      })
    });

    // do admina
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ADMIN_EMAIL,
      subject: `Nowe zamówienie #${orderNumber}`,
      react: OrderConfirmEmail({
        orderNumber,
        totalPrice: total,
        customerName
      })
    });
  } catch (error) {
    console.error("Błąd podczas wysyłki maila:", error);
  }
}