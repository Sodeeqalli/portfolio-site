import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const terminalMono = JetBrains_Mono({
  variable: "--font-terminal",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sodeeq Alli — Terminal Portfolio",
  description:
    "Soft terminal portfolio for Sodeeq Alli: software engineer, cloud architect, and mobile developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={terminalMono.variable}>{children}</body>
    </html>
  );
}
