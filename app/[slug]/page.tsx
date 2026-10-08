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
    const baseUrl = 'https://palmhealth.vercel.app';
    
    return {
      title: `${post.title} | PALM Health`,
      description: post.excerpt,
      keywords: post.tags || ['salud', 'bienestar', 'PALM Health'],
      authors: [{ name: post.author || 'AL HAPPY' }],
      creator: 'PALM Health',
      publisher: 'PALM Health',
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      openGraph: {
        title: post.title,
        description: post.excerpt,
        url: `${baseUrl}/${post.slug}`,
        siteName: 'PALM Health',
        locale: 'es_ES',
        type: 'article',
        publishedTime: post.date,
        authors: [post.author || 'AL HAPPY'],
        images: [
          {
            url: post.coverImage || `${baseUrl}/og-default.jpg`,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: [post.coverImage || `${baseUrl}/og-default.jpg`],
      },
      alternates: {
        canonical: `${baseUrl}/${post.slug}`,
      },
    };
  } catch {
    return {
      title: 'Post No Encontrado - PALM Health',
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

  // 🚀 DATOS ESTRUCTURADOS (JSON-LD) PARA GOOGLE
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: post.coverImage ? [post.coverImage] : [],
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author || 'AL HAPPY',
    },
    publisher: {
      '@type': 'Organization',
      name: 'PALM Health',
      logo: {
        '@type': 'ImageObject',
        url: 'https://palmhealth.vercel.app/og-default.jpg',
      },
    },
    description: post.excerpt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://palmhealth.vercel.app/${post.slug}`,
    },
  };

  return (
    <>
      {/* Inyección del JSON-LD en el head de la página */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
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

        {/* ✅ IMAGEN OPTIMIZADA: loading="lazy" y alt descriptivo */}
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            loading="lazy"
            className="w-full h-96 object-cover rounded-lg mb-8"
          />
        )}

        {/* ✅ RENDERIZADO CORRECTO: post.contentHtml en lugar de post.content */}
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </>
  );
}