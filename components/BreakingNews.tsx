'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Post {
  slug: string;
  title: string;
  category: string;
  coverImage?: string;
}

interface BreakingNewsProps {
  posts: Post[];
}

export default function BreakingNews({ posts }: BreakingNewsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length);
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(interval);
  }, [posts.length]);

  if (posts.length === 0) return null;

  const currentPost = posts[currentIndex];

  return (
    <div className="bg-gray-100 border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center">
          {/* Label BREAKING */}
          <div className="bg-gray-900 text-white px-4 py-1 font-bold text-sm flex items-center">
            <svg className="w-4 h-4 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
            </svg>
            BREAKING
          </div>

          {/* Contenido deslizante */}
          <div className="flex-1 ml-4 overflow-hidden relative h-8">
            {posts.map((post, index) => (
              <div
                key={post.slug}
                className={`absolute inset-0 flex items-center transition-all duration-500 ease-in-out ${
                  index === currentIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                }`}
              >
                {post.coverImage && (
                  <img 
                    src={post.coverImage} 
                    alt={post.title}
                    className="w-12 h-8 object-cover mr-3 rounded"
                  />
                )}
                <span className="bg-[#e91e4d] text-white text-xs px-2 py-0.5 rounded mr-3 font-semibold">
                  {post.category}
                </span>
                <Link 
                  href={`/${post.slug}`}
                  className="text-gray-800 hover:text-[#e91e4d] font-medium truncate"
                >
                  {post.title}
                </Link>
              </div>
            ))}
          </div>

          {/* Indicadores */}
          <div className="flex space-x-1 ml-4">
            {posts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-[#e91e4d]' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}