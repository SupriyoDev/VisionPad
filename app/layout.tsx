import TanstackProvider from "@/components/shared/tanstack-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "VisionPad",
  description: "Reshape your visions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn("antialiased w-full h-full    ", outfit.className)}>
          <TanstackProvider>{children}</TanstackProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
