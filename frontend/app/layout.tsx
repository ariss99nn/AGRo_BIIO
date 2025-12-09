/**
 * Layout raíz de la aplicación AGRo_BIIO
 * 
 * - Carga la tipografía Space Grotesk desde Google Fonts
 * - Aplica estilos globales y variables CSS
 * - Envuelve todas las páginas con AppShell (header + sidebar)
 */

import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";

/* 
 * Tipografía principal: Space Grotesk
 * Moderna, legible y con personalidad para app agrícola
 */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/* Metadata del sitio */
export const metadata: Metadata = {
  title: "AGRo_BIIO – Gestión Agrícola",
  description: "Sistema de gestión agrícola inteligente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {/* 
        Body con tipografía aplicada y antialiased para mejor rendering
        El fondo y color se heredan de globals.css
      */}
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        {/* AppShell provee header + sidebar + área de contenido */}
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
