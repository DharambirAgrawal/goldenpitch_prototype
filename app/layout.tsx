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
  title: "Dwips - Assistive Navigation for Visually Impaired",
  description:
    "Dwips is an advanced wearable assistive device companion app designed to empower visually impaired users with intelligent navigation, obstacle detection, and accessibility features for safer independent mobility.",
  keywords: [
    "assistive technology",
    "visually impaired",
    "navigation app",
    "accessibility",
    "wearable device",
    "obstacle detection",
    "blind navigation",
    "assistive navigation",
  ],
  authors: [{ name: "Dwips Team" }],
  creator: "Dwips",
  publisher: "Dwips",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Dwips - Assistive Navigation for Visually Impaired",
    description:
      "Advanced wearable assistive device companion app for visually impaired users with intelligent navigation and obstacle detection",
    type: "website",
    locale: "en_US",
    siteName: "Dwips",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dwips - Assistive Navigation for Visually Impaired",
    description:
      "Advanced wearable assistive device companion app for visually impaired users with intelligent navigation and obstacle detection",
    creator: "@dwips",
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/dwips_logo.ico", sizes: "any" }],
    apple: "/dwips_logo.ico",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Dwips",
    description:
      "Advanced wearable assistive device companion app for visually impaired users with intelligent navigation and obstacle detection",
    url: "https://dwips.com",
    logo: "https://dwips.com/dwips_logo.ico",
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Dwips - Assistive Navigation",
    description:
      "Advanced wearable assistive device companion app designed to empower visually impaired users with intelligent navigation, obstacle detection, and accessibility features",
    url: "https://dwips.com",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    accessibilityAPI: "ARIA",
    accessibilityFeature:
      "audioDescription,largePrint,highContrast,alternativeText",
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-gray-50 dark:bg-gray-900`}
      >
        <AppProvider>
          <div className="md:pl-64">{children}</div>
          <Navigation />
        </AppProvider>
      </body>
    </html>
  );
}
