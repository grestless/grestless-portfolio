import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import CanvasNoise from "@/components/CanvasNoise";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Guillermo D. Ghiggia — Full Stack Developer & UI Designer",
  description:
    "No hago sitios bonitos. Hago sitios que la gente quiere usar. Portfolio de desarrollo web Full Stack y diseño UI.",
  openGraph: {
    title: "Guillermo D. Ghiggia — Full Stack Developer & UI Designer",
    description:
      "No hago sitios bonitos. Hago sitios que la gente quiere usar.",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body>
        <CanvasNoise />
        <CustomCursor />
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
