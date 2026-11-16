import type { Metadata } from "next";
import CartContents from "@/components/CartContents";

export const metadata: Metadata = { title: "Cart" };

export default function CartPage() {
  return (
    <div className="wrap max-w-2xl py-8 sm:py-12">
      <h1 className="text-4xl font-semibold tracking-tight">Your cart</h1>
      <div className="mt-6 flex flex-col rounded-3xl bg-white p-5 sm:p-8">
        <CartContents />
      </div>
    </div>
  );
}
