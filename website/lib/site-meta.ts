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
      "أكثر من ١١ لهجة، وعي بالمشروع، `/arabic audit`، وخطط لمواقع وحملات وكتب.",
  },
  "/install": {
    title: "ثبّت المهارة — npx وCursor وClaude وCodex",
    description:
      "أمر واحد من التيرمنال. ٢٤ أداة مدعومة. أوامر التثبيت من README.",
  },
  "/commands": {
    title: "أوامر `/arabic` — دليل سريع",
    description:
      "guide، write، audit، plan، coach، voice، auto — مع أمثلة جاهزة للنسخ.",
  },
  "/tutorials": {
    title: "دروس عربية — ابدأ من هنا",
    description:
      "التثبيت، أول أوامر، ومراجعة النص بالمصري المضبوط.",
  },
  "/examples": {
    title: "أمثلة — قبل وبعد التأنيس",
    description: "قارن بين نص مترجم جامد ونص مصري مضبوط.",
  },
  "/about": {
    title: "عن المهارة — MediaBubble",
    description:
      "`arabic/` runtime، ٣٨ حزمة مرجعية، والمستشار قبل الكاتب.",
  },
  "/docs": {
    title: "الوثائق والمصادر",
    description:
      "README، CHANGELOG، ٢٤ أداة، ومساهمة — النسخة الكاملة على GitHub.",
  },
  "/newsletter": {
    title: "النشرة — تابع التحديثات",
    description:
      "نشرة شهرية: إصدارات جديدة، أمثلة من المجتمع، ونصائح محتوى عربي.",
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
