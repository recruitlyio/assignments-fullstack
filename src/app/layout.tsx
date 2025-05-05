import type { Metadata } from "next";
import { Geist } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Interview Question Generator",
  description:
    "AI-Powered Interview Question Generator. Built with Next.js, TypeScript, Tailwind CSS, Shadcn UI, and Google Gemini",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className}`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
