export type SiteRoute =
  | "/"
  | "/features"
  | "/install"
  | "/commands"
  | "/tutorials"
  | "/examples"
  | "/about"
  | "/docs"
  | "/newsletter"
  | "/privacy"
  | "/terms";

export const siteMeta: Record<
  SiteRoute,
  { title: string; description: string }
> = {
  "/": {
    title: "مهارة العربية الرائعة — شريكك المصري لكتابة المحتوى",
    description:
      "ثبّت المهارة في Cursor وClaude وCodex. استشارة → توضيح → توصية → كتابة → مراجعة. مش مجرد ترجمة.",
  },
  "/features": {
    title: "مميزات مهارة العربية — لهجات، تأنيس، مشروع، تدقيق",
    description:
      "١١+ لهجة، وعي المشروع، `/arabic audit`، خطط لمواقع وحملات وكتب.",
  },
  "/install": {
    title: "ثبّت المهارة — npx وCursor وClaude وCodex",
    description:
      "سطر واحد من التيرمنال. ٢٤ أداة مدعومة. أوامر التثبيت من README.",
  },
  "/commands": {
    title: "أوامر `/arabic` — دليل سريع",
    description:
      "guide، write، audit، plan، coach، voice، auto — مع أمثلة جاهزة للنسخ.",
  },
  "/tutorials": {
    title: "دروس عربية — ابدأ من هنا",
    description:
      "شرح المشروع، التثبيت، وأول أوامر بالمصري الطبيعي.",
  },
  "/examples": {
    title: "أمثلة — قبل وبعد التأنيس",
    description: "شوف الفرق بين نص مترجم جامد ونص مصري طبيعي.",
  },
  "/about": {
    title: "عن المهارة — MediaBubble",
    description:
      "`arabic/` runtime، ٣٨ حزمة مرجعية، فلسفة المستشار قبل الكاتب.",
  },
  "/docs": {
    title: "الوثائق والمصادر",
    description:
      "README، CHANGELOG، ٢٤ أداة، مساهمة — النسخة الكاملة على GitHub.",
  },
  "/newsletter": {
    title: "النشرة — خليك متابع",
    description:
      "نشرة شهرية: إصدارات جديدة، أمثلة من المجتمع، ونصايح محتوى عربي.",
  },
  "/privacy": {
    title: "سياسة الخصوصية",
    description: "كيف نتعامل مع بياناتك على موقع مهارة العربية.",
  },
  "/terms": {
    title: "شروط الاستخدام",
    description: "شروط استخدام موقع مهارة العربية ومشروع MediaBubble.",
  },
} as const;

export const navLinks: { href: SiteRoute; label: string }[] = [
  { href: "/", label: "الرئيسية" },
  { href: "/features", label: "المميزات" },
  { href: "/install", label: "التثبيت" },
  { href: "/commands", label: "الأوامر" },
  { href: "/tutorials", label: "الدروس" },
  { href: "/examples", label: "أمثلة" },
  { href: "/about", label: "عن المهارة" },
  { href: "/docs", label: "الوثائق" },
];

export const secondaryNavLinks: { href: SiteRoute; label: string }[] = [
  { href: "/newsletter", label: "النشرة" },
];
