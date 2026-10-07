export default function Sidebar() {
  const popularPosts = [
    { title: 'Snacks saludables para el trabajo', image: '🥗' },
    { title: 'Máquinas básicas del gimnasio', image: '💪' },
    { title: 'Cómo bajar el colesterol sin medicamentos', image: '❤️' },
    { title: 'Calculadoras de salud gratuitas', image: '🧮' },
    { title: 'Alzheimer vs Demencia Senil', image: '🧠' },
  ];

  return (
    <aside className="space-y-6">
      {/* Contador de visitas */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex justify-center gap-1 mb-2">
          {[0,1,1,7,7,8].map((num, i) => (
            <span key={i} className="bg-gray-900 text-white px-2 py-1 rounded text-lg font-mono font-bold">
              {num}
            </span>
          ))}
        </div>
      </div>

      {/* Popular Posts */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Popular Posts</h3>
        <div className="space-y-4">
          {popularPosts.map((post, index) => (
            <div key={index} className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-0">
              <div className="text-3xl">{post.image}</div>
              <p className="text-sm text-gray-700 hover:text-[#e91e4d] cursor-pointer transition-colors">
                {post.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}