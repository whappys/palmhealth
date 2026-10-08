import { getAllPosts } from '@/lib/posts';
import BlogCard from '@/components/BlogCard';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryName = slug.replace(/-/g, ' ').toUpperCase();
  return {
    title: `${categoryName} - PALM Health`,
    description: `Artículos sobre ${categoryName.toLowerCase()}`,
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const categories = Array.from(new Set(posts.map(p => p.category)));
  return categories.map(category => ({
    slug: category.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export default async function CategoriaPage({ params }: PageProps) {
  const { slug } = await params;
  const posts = await getAllPosts();
  
  // CORRECCIÓN: Comparamos slug con slug para que coincidan perfectamente
  const targetSlug = slug.toLowerCase();
  
  const filteredPosts = posts.filter(post => 
    post.category.toLowerCase().replace(/\s+/g, '-') === targetSlug
  );

  // Si no hay posts en esta categoría, mostrar 404
  if (filteredPosts.length === 0) {
    notFound();
  }

  const categoryTitle = slug.replace(/-/g, ' ').toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Título de la categoría */}
        <div className="mb-8 pb-4 border-b-2 border-[#e91e4d]">
          <h1 className="text-4xl font-bold text-gray-900">
            {categoryTitle}
          </h1>
          <p className="text-gray-600 mt-2">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'artículo' : 'artículos'} disponibles
          </p>
        </div>

        {/* Lista de posts de esta categoría */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {filteredPosts.map((post) => (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                category={post.category}
                excerpt={post.excerpt}
                date={post.date}
                coverImage={post.coverImage}
              />
            ))}
          </div>

          {/* Sidebar con otras categorías */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Otras Categorías</h3>
              <div className="space-y-2">
                {Array.from(new Set(posts.map(p => p.category)))
                  .filter(cat => cat.toLowerCase().replace(/\s+/g, '-') !== targetSlug)
                  .map((cat) => (
                    <a
                      key={cat}
                      href={`/categoria/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block text-sm text-gray-700 hover:text-[#e91e4d] hover:bg-gray-50 px-3 py-2 rounded transition-colors"
                    >
                      {cat}
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}