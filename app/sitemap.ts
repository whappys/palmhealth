import { getAllPosts } from '@/lib/posts';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  
  const postUrls = posts.map((post) => ({
    url: `https://palmshealth.vercel.app/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [
    {
      url: 'https://palmshealth.vercel.app',
      lastModified: new Date(),
    },
    {
      url: 'https://palmshealth.vercel.app/about',
      lastModified: new Date(),
    },
    ...postUrls,
  ];
}