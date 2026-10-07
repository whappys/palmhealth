import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    return {
      title: `${post.title} - PALM Health`,
      description: post.excerpt,
    };
  } catch {
    return {
      title: 'Post No Encontrado',
    };
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  
  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
          {post.category}
        </span>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="flex items-center text-gray-600 text-sm">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span className="mx-2">•</span>
          <span>{post.author}</span>
        </div>
      </header>

      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-96 object-cover rounded-lg mb-8"
        />
      )}

      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}