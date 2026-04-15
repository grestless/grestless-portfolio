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
  title: "Guillermo D. Ghiggia | Full Stack Developer & UI Designer",
  description:
    "Desarrollo web end-to-end con foco en experiencia de usuario, rendimiento y arquitectura sólida.",
  keywords: [
    "Desarrollador Full Stack",
    "Frontend Developer",
    "Backend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "UI Design",
    "Portfolio Web",
    "Guillermo Ghiggia",
    "grestless",
    "Landing Page",
    "Desarrollo Web",
    "Desarrollador en Tucumán",
    "Programador Web Argentina",
    "Programador Web Tucumán",
    "Desarrollo Web Argentina",
  ],
  authors: [{ name: "Guillermo D. Ghiggia", url: "https://grestless.dev" }],
  creator: "Guillermo D. Ghiggia",
  metadataBase: new URL("https://grestless.dev"),
  openGraph: {
    title: "Guillermo D. Ghiggia | Full Stack Developer",
    description:
      "Desarrollo web end-to-end con foco en experiencia de usuario y arquitectura sólida.",
    url: "https://grestless.dev",
    siteName: "Guillermo D. Ghiggia Portfolio",
    images: [
      {
        url: "/og-image.png", // Debes colocar una imagen en la carpeta public/
        width: 1200,
        height: 630,
        alt: "Previsualización del portfolio de Guillermo",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guillermo D. Ghiggia | Full Stack Developer",
    description:
      "Desarrollo web end-to-end con foco en experiencia de usuario y arquitectura sólida.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
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
