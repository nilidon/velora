import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: "600",
  style: "italic",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://veloracleaningstatenisland.com"),
  title: {
    default: "Staten Island Cleaning Services | Velora Cleaning",
    template: "%s | Velora Cleaning",
  },
  description:
    "Luxury-grade, eco-friendly cleaning for homes, Airbnb turnovers, offices, and post-construction jobs across Staten Island and NYC. Licensed, insured, 15-minute quotes.",
  icons: {
    icon: "/photos/logo.png",
    apple: "/photos/logo.png",
  },
  openGraph: {
    title: "Velora Cleaning Services | Staten Island",
    description: "Premium cleaning that books from the first call.",
    type: "website",
    images: ["/photos/hero-kitchen.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  const ads = process.env.NEXT_PUBLIC_ADS_ID;
  const ads2 = process.env.NEXT_PUBLIC_ADS_ID_SECONDARY;

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${playfair.variable} ${cormorant.variable} h-full antialiased`}
    >
      <head>
        {ga && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${ga}');
                  ${ads ? `gtag('config', '${ads}');` : ""}
                  ${ads2 ? `gtag('config', '${ads2}');` : ""}
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col bg-cream text-ink">{children}</body>
    </html>
  );
}
