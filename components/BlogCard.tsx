import Link from 'next/link';

interface BlogCardProps {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  coverImage?: string;
}

export default function BlogCard({ slug, title, category, excerpt, date, coverImage }: BlogCardProps) {
  return (
    <article className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {coverImage && (
        <img 
          src={coverImage} 
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-[#e91e4d] text-white px-3 py-1 text-xs font-bold uppercase">
            {category}
          </span>
          <time className="text-xs text-gray-500 uppercase font-semibold">
            {new Date(date).toLocaleDateString('es-ES', {
              year: 'numeric', month: 'long', day: 'numeric'
            }).toUpperCase()}
          </time>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-[#e91e4d] transition-colors">
          <Link href={`/${slug}`}>{title}</Link>
        </h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{excerpt}</p>
        <div className="flex items-center text-xs text-gray-500 border-t pt-3">
          <span className="mr-4">👤 AL HAPPY</span>
          <span> 0</span>
        </div>
      </div>
    </article>
  );
}