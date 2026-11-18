import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sodeeq Alli — Software Engineer",
  description:
    "Portfolio of Sodeeq Alli, a backend-oriented software engineer working across cloud systems, applied machine learning and enterprise architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
