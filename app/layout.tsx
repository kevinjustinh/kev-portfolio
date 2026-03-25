import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans } from "next/font/google";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Kevin Hernandez — Program Ops, Community & Builder",
  description:
    "10+ years building developer communities and programs at Google, Springboard, and beyond. Based in the SF Bay Area.",
  metadataBase: new URL("https://kevinjhernandez.com"),
  openGraph: {
    title: "Kevin Hernandez — Program Ops, Community & Builder",
    description:
      "10+ years building developer communities and programs at Google, Springboard, and beyond. Based in the SF Bay Area.",
    url: "https://kevinjhernandez.com",
    siteName: "Kevin Hernandez",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${dmSans.variable}`}
    >
      <body className="antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
