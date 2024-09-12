import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Code Threads",
  description: "Share cool code snippets and interact with other developers!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>{children}</body>
    </html>
  );
}
