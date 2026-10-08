import Link from 'next/link';

export default function PrivacidadPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
          AVISOS LEGALES
        </span>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Política de Privacidad
        </h1>
        <time className="text-gray-600 text-sm">
          Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
        </time>
      </header>

      <div className="prose prose-lg max-w-none">
        <h2>1. Introducción</h2>
        <p>
          En <strong>PALM Health</strong> (en adelante, "el Sitio"), nos comprometemos a proteger y respetar tu privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos y protegemos tu información personal cuando visitas nuestro sitio web <strong>https://palmhealth.vercel.app</strong>.
        </p>

        <h2>2. Información que recopilamos</h2>
        <p>Podemos recopilar los siguientes tipos de información:</p>
        <ul>
          <li><strong>Datos de navegación:</strong> dirección IP, tipo de navegador, páginas visitadas, tiempo de permanencia.</li>
          <li><strong>Datos proporcionados voluntariamente:</strong> nombre, correo electrónico (si nos contactas o te suscribes).</li>
          <li><strong>Cookies:</strong> pequeños archivos que se almacenan en tu dispositivo para mejorar la experiencia de usuario.</li>
        </ul>

        <h2>3. Uso de la información</h2>
        <p>Utilizamos la información recopilada para:</p>
        <ul>
          <li>Mejorar el contenido y la experiencia del usuario.</li>
          <li>Analizar el tráfico y el comportamiento de navegación.</li>
          <li>Enviar comunicaciones (solo si te has suscrito voluntariamente).</li>
          <li>Cumplir con obligaciones legales.</li>
        </ul>

        <h2>4. Compartir información con terceros</h2>
        <p>
          No vendemos, intercambiamos ni transferimos tu información personal a terceros sin tu consentimiento, excepto cuando sea requerido por ley o para proteger nuestros derechos.
        </p>

        <h2>5. Tus derechos</h2>
        <p>Tienes derecho a:</p>
        <ul>
          <li>Acceder a tu información personal.</li>
          <li>Solicitar la corrección o eliminación de tus datos.</li>
          <li>Oponerte al tratamiento de tus datos.</li>
          <li>Retirar tu consentimiento en cualquier momento.</li>
        </ul>

        <h2>6. Contacto</h2>
        <p>
          Si tienes preguntas sobre esta Política de Privacidad, puedes contactarnos a través de nuestra página de <Link href="/contact" className="text-red-500 hover:underline">Contacto</Link>.
        </p>
      </div>
    </article>
  );
}