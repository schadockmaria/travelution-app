import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomNavigation from "@/components/BottomNavigation";
import Banner from "@/components/Banner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Travel Explorer",
  description: "Deine persönliche Reise-App für unvergessliche Abenteuer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-800`}
      >
        <div className="max-w-[430px] mx-auto min-h-screen bg-white relative overflow-x-hidden">
          // in src/app/layout.tsx
<main className="pb-16 px-5">
            {children}
          </main>
          <BottomNavigation />
        </div>
      </body>
    </html>
  );
}
