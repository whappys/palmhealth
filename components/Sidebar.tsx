import Link from 'next/link';
import { Post } from '@/lib/posts';

interface SidebarProps {
  posts: Post[];
}

export default function Sidebar({ posts }: SidebarProps) {
  // Tomar los 5 posts más recientes como "populares"
  const popularPosts = posts.slice(0, 5);

  return (
    <aside className="space-y-6">
      {/* Contador de visitas */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex justify-center gap-1 mb-2">
          {[0, 1, 1, 7, 7, 8].map((num, i) => (
            <span key={i} className="bg-gray-900 text-white px-2 py-1 rounded text-lg font-mono font-bold">
              {num}
            </span>
          ))}
        </div>
      </div>

      {/* Popular Posts - Ahora dinámico */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Popular Posts</h3>
        <div className="space-y-4">
          {popularPosts.length > 0 ? (
            popularPosts.map((post, index) => (
              <Link 
                key={post.slug} 
                href={`/${post.slug}`}
                className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
              >
                {post.coverImage ? (
                  <img 
                    src={post.coverImage} 
                    alt={post.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-2xl">
                    📄
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-sm text-gray-700 font-medium hover:text-[#e91e4d] line-clamp-2">
                    {post.title}
                  </p>
                  <time className="text-xs text-gray-500">
                    {new Date(post.date).toLocaleDateString('es-ES', { 
                      day: 'numeric', 
                      month: 'short' 
                    })}
                  </time>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-gray-500">No hay posts aún.</p>
          )}
        </div>
      </div>

      {/* Categorías */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Categorías</h3>
        <div className="space-y-2">
          {Array.from(new Set(posts.map(p => p.category))).map((category) => (
            <div key={category} className="text-sm text-gray-700 hover:text-[#e91e4d] cursor-pointer">
              {category}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}