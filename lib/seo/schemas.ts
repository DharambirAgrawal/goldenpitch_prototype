/**
 * Structured Data for SEO
 * This file contains JSON-LD schema.org markup for better search engine visibility
 */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Dwips",
  description:
    "Advanced wearable assistive device companion app for visually impaired users with intelligent navigation and obstacle detection",
  url: "https://dwips.com",
  logo: "https://dwips.com/dwips_logo.ico",
  foundingDate: "2025",
  sameAs: [
    // Add social media links here when available
  ],
};

export const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Dwips - Assistive Navigation",
  description:
    "Advanced wearable assistive device companion app designed to empower visually impaired users with intelligent navigation, obstacle detection, and accessibility features for safer independent mobility",
  url: "https://dwips.com",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web, iOS, Android",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Real-time obstacle detection",
    "Multiple feedback modes (audio, haptic, visual)",
    "Indoor and outdoor navigation modes",
    "Text-to-speech accessibility",
    "Journey tracking and history",
    "Customizable settings",
    "High contrast mode",
    "Multiple font sizes",
  ],
  screenshot: "https://dwips.com/screenshot.png",
  accessibilityAPI: "ARIA",
  accessibilityControl: "fullKeyboardControl,fullTouchControl,fullVoiceControl",
  accessibilityFeature:
    "audioDescription,largePrint,highContrast,alternativeText,readingOrder",
  accessibilityHazard:
    "noFlashingHazard,noMotionSimulationHazard,noSoundHazard",
};

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});
