"use client";

export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type="text/javascript"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
