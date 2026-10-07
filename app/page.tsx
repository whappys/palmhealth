import { getAllPosts } from '@/lib/posts';
import BlogCard from '@/components/BlogCard';
import Sidebar from '@/components/Sidebar';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna principal con los posts */}
          <div className="lg:col-span-2 space-y-8">
            {posts.length > 0 ? (
              posts.map((post) => (
                <BlogCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  category={post.category}
                  excerpt={post.excerpt}
                  date={post.date}
                  coverImage={post.coverImage}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 py-12">
                No hay artículos aún.
              </p>
            )}
          </div>

          {/* Sidebar con Popular Posts reales */}
          <div className="lg:col-span-1">
            <Sidebar posts={posts} />
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2026 PALM Health. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}