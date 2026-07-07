import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, JetBrains_Mono } from "next/font/google";
import { InlineScript } from "@/components/inline-script";
import "./globals.css";

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const noFlashTheme = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;}else{document.documentElement.dataset.theme='dark';}}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export const metadata: Metadata = {
  metadataBase: new URL("https://arabic-skill.vercel.app"),
  title: { default: "مهارة العربية الرائعة", template: "%s · مهارة العربية" },
  description: "شريكك المصري لكتابة المحتوى — مش مجرد ترجمة.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <InlineScript html={noFlashTheme} />
      </head>
      <body className={`${arabic.variable} ${mono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
