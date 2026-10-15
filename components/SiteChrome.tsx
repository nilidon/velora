import { Suspense } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileDock } from "./MobileDock";
import { AnalyticsBeacon } from "./AnalyticsBeacon";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col bg-cream pb-24 md:pb-0">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileDock />
      <Suspense fallback={null}>
        <AnalyticsBeacon />
      </Suspense>
    </div>
  );
}
