import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-red-500 text-white">
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold">
              PALM Health
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/" className="hover:text-red-200">Home</Link>
              <Link href="/about" className="hover:text-red-200">About</Link>
              <Link href="/contact" className="hover:text-red-200">Contact</Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Redes sociales */}
            <a href="#" className="hover:text-red-200">Facebook</a>
            <a href="#" className="hover:text-red-200">Pinterest</a>
          </div>
        </div>
      </nav>
    </header>
  );
}