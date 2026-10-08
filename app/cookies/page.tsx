import Link from 'next/link';

export default function CookiesPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
          AVISOS LEGALES
        </span>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Política de Cookies
        </h1>
        <time className="text-gray-600 text-sm">
          Última actualización: Octubre 2026
        </time>
      </header>

      <div className="prose prose-lg max-w-none">
        <h2>1. ¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo (computadora, teléfono o tableta) cuando los visitas. Se utilizan ampliamente para que los sitios web funcionen de manera más eficiente y para proporcionar información a los propietarios del sitio.
        </p>

        <h2>2. Tipos de cookies que utilizamos</h2>
        
        <h3>Cookies esenciales</h3>
        <p>
          Son necesarias para el funcionamiento básico del sitio. Sin ellas, algunas partes del sitio no funcionarían correctamente.
        </p>

        <h3>Cookies de análisis</h3>
        <p>
          Nos permiten entender cómo los visitantes interactúan con el sitio, recopilando información de forma anónima. Utilizamos herramientas como Google Analytics para este propósito.
        </p>

        <h3>Cookies de funcionalidad</h3>
        <p>
          Permiten que el sitio recuerde tus preferencias (como el idioma o la región) para ofrecerte una experiencia personalizada.
        </p>

        <h2>3. Cómo gestionar las cookies</h2>
        <p>
          Puedes configurar tu navegador para rechazar todas las cookies o para que te avise cuando se envíe una cookie. Sin embargo, si rechazas las cookies, es posible que algunas funciones del sitio no estén disponibles.
        </p>
        <ul>
          <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
          <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad</li>
          <li><strong>Safari:</strong> Preferencias → Privacidad</li>
          <li><strong>Edge:</strong> Configuración → Cookies y permisos del sitio</li>
        </ul>

        <h2>4. Contacto</h2>
        <p>
          Si tienes dudas sobre nuestra Política de Cookies, contáctanos a través de nuestra página de <Link href="/contact" className="text-red-500 hover:underline">Contacto</Link>.
        </p>
      </div>
    </article>
  );
}