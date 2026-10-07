import Link from 'next/link';

export default function Header() {
  return (
    <header>
      {/* Barra de navegación roja superior */}
      <nav className="bg-[#e91e4d] text-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="font-semibold hover:text-white/80">Home</Link>
            <Link href="/about" className="hover:text-white/80">About</Link>
            <Link href="/contact" className="hover:text-white/80">Contact</Link>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-white/80" aria-label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-white/80" aria-label="Pinterest">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.174.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z"/>
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {/* Sección del logo y descripción */}
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              {/* Aquí puedes reemplazar con tu logo real */}
              <div className="text-4xl font-bold text-gray-900">
                <span className="text-[#e91e4d]">PALM</span> Health
              </div>
              <div className="text-sm text-gray-600 -mt-2">STORE</div>
            </Link>
          </div>
          {/* Descripción */}
          <p className="text-gray-700 text-sm max-w-md">
            PALM HEALTH COMPARTE INFORMACIÓN SOBRE SALUD, NUTRICIÓN, BIENESTAR Y HÁBITOS PARA MEJORAR LA CALIDAD DE VIDA.
          </p>
        </div>
      </div>

      {/* Barra de búsqueda oscura */}
      <div className="bg-gray-800 py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-end">
          <button className="bg-[#e91e4d] text-white px-4 py-2 rounded hover:bg-[#c4163f]">
            🔍
          </button>
        </div>
      </div>
    </header>
  );
}