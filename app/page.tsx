import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        Blog de PALM Health
      </h1>
      
      <div className="grid gap-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <article key={post.slug} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-xs font-bold text-red-600 uppercase tracking-wide">
                {post.category}
              </span>
              <h2 className="text-2xl font-bold text-gray-900 mt-2 mb-3">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <time className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString('es-ES', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </time>
                <Link 
                  href={`/${post.slug}`}
                  className="text-red-600 font-semibold hover:text-red-800 hover:underline"
                >
                  Leer artículo →
                </Link>
              </div>
            </article>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No hay artículos aún. ¡Crea tu primer archivo .md en la carpeta <code>content/posts/</code>!
          </p>
        )}
      </div>
    </main>
  );
}