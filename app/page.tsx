import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import Header from '@/components/Header';
import BreakingNews from '@/components/BreakingNews';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div>
      <Header />
      <BreakingNews />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {posts.map((post) => (
              <article key={post.slug} className="bg-white rounded-lg shadow-md overflow-hidden">
                {post.coverImage && (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-64 object-cover"
                  />
                )}
                <div className="p-6">
                  <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold mb-3">
                    {post.category}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <time className="text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <Link
                      href={`/${post.slug}`}
                      className="text-red-500 hover:text-red-600 font-semibold"
                    >
                      Leer más →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Popular Posts</h3>
              {/* Agregar componente de Popular Posts */}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}