'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Post {
  slug: string;
  title: string;
  category: string;
  coverImage?: string;
}

interface CategoryMenuProps {
  categories: string[];
  posts: Post[];
}

export default function CategoryMenu({ categories, posts }: CategoryMenuProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-1">
          {/* Home */}
          <Link 
            href="/" 
            className="flex items-center px-4 py-3 bg-[#e91e4d] hover:bg-[#c4163f] transition-colors font-semibold"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
            </svg>
            HOME
          </Link>

          {/* Categorías dinámicas */}
          {categories.map((category) => {
            const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
            const categoryPosts = posts.filter(p => p.category === category).slice(0, 3);

            return (
              <div 
                key={category}
                className="relative"
                onMouseEnter={() => setActiveDropdown(category)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link 
                  href={`/categoria/${categorySlug}`}
                  className="px-4 py-3 hover:bg-gray-800 transition-colors flex items-center"
                >
                  {category}
                  {categoryPosts.length > 0 && (
                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                  )}
                </Link>
                
                {activeDropdown === category && categoryPosts.length > 0 && (
                  <div className="absolute top-full left-0 bg-gray-800 shadow-lg z-50 min-w-[300px]">
                    {categoryPosts.map((post) => (
                      <Link 
                        key={post.slug}
                        href={`/${post.slug}`}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-[#e91e4d] transition-colors border-b border-gray-700 last:border-0"
                      >
                        {post.coverImage && (
                          <img 
                            src={post.coverImage} 
                            alt={post.title}
                            className="w-12 h-12 object-cover rounded"
                          />
                        )}
                        <span className="text-sm line-clamp-2">{post.title}</span>
                      </Link>
                    ))}
                    <Link 
                      href={`/categoria/${categorySlug}`}
                      className="block px-4 py-2 text-center text-xs bg-gray-900 hover:bg-[#e91e4d] transition-colors"
                    >
                      Ver todos los posts de {category} →
                    </Link>
                  </div>
                )}
              </div>
            );
          })}

          {/* Avisos Legales */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('legal')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="px-4 py-3 hover:bg-gray-800 transition-colors flex items-center">
              AVISOS LEGALES
              <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </button>
            
            {activeDropdown === 'legal' && (
              <div className="absolute top-full left-0 bg-gray-800 shadow-lg z-50 min-w-[200px]">
                <Link href="/privacidad" className="block px-4 py-2 hover:bg-[#e91e4d] transition-colors">
                  Política de Privacidad
                </Link>
                <Link href="/cookies" className="block px-4 py-2 hover:bg-[#e91e4d] transition-colors">
                  Política de Cookies
                </Link>
                <Link href="/terminos" className="block px-4 py-2 hover:bg-[#e91e4d] transition-colors">
                  Términos de Uso
                </Link>
              </div>
            )}
          </div>

          {/* Botón de búsqueda */}
          <button className="ml-auto bg-[#e91e4d] px-4 py-3 hover:bg-[#c4163f] transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}