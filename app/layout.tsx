import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import CategoryMenu from "@/components/CategoryMenu";
import BreakingNews from "@/components/BreakingNews";
import { getAllPosts } from "@/lib/posts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PALM Health",
  description: "Información sobre salud, nutrición, bienestar y hábitos para mejorar la calidad de vida.",
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