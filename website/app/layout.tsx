import type { Metadata } from "next";
import { Almarai, JetBrains_Mono } from "next/font/google";
import { InlineScript } from "@/components/inline-script";
import "./globals.css";

const arabic = Almarai({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "700", "800"],
  variable: "--font-arabic",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Runs before hydration to set the theme from localStorage, avoiding a flash.
const noFlashTheme = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;}else{document.documentElement.dataset.theme='dark';}}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export const metadata: Metadata = {
  metadataBase: new URL("https://arabic-skill.vercel.app"),
  title: { default: "مهارة العربية الرائعة", template: "%s · مهارة العربية" },
  description: "شريكك المصري لكتابة المحتوى. مش مجرد ترجمة.",
};

const softwareLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "مهارة العربية الرائعة",
  alternateName: "Awesome Arabic Skill",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Cross-platform",
  description: "شريكك المصري لكتابة المحتوى. مش مجرد ترجمة.",
  url: "https://arabic-skill.vercel.app",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "MediaBubble" },
  license: "https://github.com/mediabubble-adv/arabic-skill/blob/main/LICENSE",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <InlineScript html={noFlashTheme} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }}
        />
      </head>
      <body className={`${arabic.variable} ${mono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
