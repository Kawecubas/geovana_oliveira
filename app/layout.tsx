import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsapp } from "@/components/FloatingWhatsapp";

export const metadata: Metadata = {
  title: "Geovana de Oliveira Imóveis | Alto Padrão e Lançamentos",
  description:
    "Consultoria imobiliária personalizada para imóveis de alto padrão, lançamentos e curadoria exclusiva.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        {children}
        <Footer />
        <FloatingWhatsapp />
      </body>
    </html>
  );
}
