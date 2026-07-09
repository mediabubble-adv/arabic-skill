import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="container-site py-10 md:py-14 flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
