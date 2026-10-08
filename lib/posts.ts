import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  coverImage?: string;
  contentHtml: string;
  author: string;
  tags?: string[];
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map(fileName => fileName.replace(/\.mdx?$/, '')); // ← Esto borra .md o .mdx correctamente
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getAllPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      return await getPostBySlug(slug);
    })
  );
  return posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}

export async function getPostBySlug(slug: string): Promise<Post> {
  // 1. Limpiamos cualquier extensión .md o .mdx del slug
  const realSlug = slug.replace(/\.mdx?$/, '');
  
  // 2. Buscamos primero el archivo .md, si no existe, buscamos .mdx
  let fullPath = path.join(postsDirectory, `${realSlug}.md`);
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  }

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post no encontrado: ${slug}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const processedContent = await remark()
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    slug: realSlug,
    title: data.title || 'Sin título',
    date: data.date || new Date().toISOString(),
    category: data.category || 'General',
    excerpt: data.excerpt || '',
    coverImage: data.coverImage,
    contentHtml: contentHtml, // ← Importante: contentHtml
    author: data.author || 'AL HAPPY',
    tags: data.tags || [],
  };
}