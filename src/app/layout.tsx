import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arena Next.js PostgreSQL Starter",
  description: "Starter template with Next.js, Drizzle, and PostgreSQL.",
};

import { Navbar } from "@/components/Navbar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body className="antialiased overflow-x-hidden bg-[#0a0506]">
        {/* Background Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-pink-900/20 blur-[140px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-rose-900/20 blur-[140px]" />
          <div className="absolute top-[30%] left-[20%] w-[40%] h-[40%] rounded-full bg-pink-500/5 blur-[120px]" />
        </div>
        
        <main className="relative min-h-screen pb-32">
          {children}
        </main>
        <Navbar />
      </body>
    </html>
  );
}
