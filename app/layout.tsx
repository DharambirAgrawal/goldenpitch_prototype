import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/context/AppContext";
import Navigation from "@/components/Navigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SafePath - Assistive Navigation",
  description: "Wearable assistive device companion app for visually impaired users",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-gray-50 dark:bg-gray-900`}
      >
        <AppProvider>
          <div className="md:pl-64">
            {children}
          </div>
          <Navigation />
        </AppProvider>
      </body>
    </html>
  );
}
