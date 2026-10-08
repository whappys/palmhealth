import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import CategoryMenu from "@/components/CategoryMenu";
import BreakingNews from "@/components/BreakingNews";
import { getAllPosts } from "@/lib/posts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'PALM Health - Salud, Nutrición y Bienestar',
    template: '%s | PALM Health',
  },
  description: 'PALM Health comparte información sobre salud, nutrición, bienestar y hábitos para mejorar la calidad de vida.',
  keywords: ['salud', 'nutrición', 'bienestar', 'fitness', 'salud mental', 'ejercicio', 'PALM Health'],
  authors: [{ name: 'AL HAPPY' }],
  creator: 'PALM Health',
  publisher: 'PALM Health',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://palmhealth.vercel.app',
    siteName: 'PALM Health',
    title: 'PALM Health - Salud, Nutrición y Bienestar',
    description: 'Información sobre salud, nutrición, bienestar y hábitos para mejorar la calidad de vida.',
    images: [
      {
        url: 'https://palmhealth.vercel.app/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'PALM Health',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PALM Health',
    description: 'Información sobre salud, nutrición, bienestar y hábitos.',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = await getAllPosts();
  const categories = Array.from(new Set(posts.map(p => p.category)));

  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <Header />
        <CategoryMenu categories={categories} posts={posts} />
        <BreakingNews posts={posts.slice(0, 5)} />
        <main>{children}</main>
      </body>
    </html>
  );
}