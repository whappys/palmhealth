import Link from 'next/link';

export default function TerminosPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
          AVISOS LEGALES
        </span>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Términos de Uso
        </h1>
        <time className="text-gray-600 text-sm">
          Última actualización: Octubre 2026
        </time>
      </header>

      <div className="prose prose-lg max-w-none">
        <h2>1. Aceptación de los términos</h2>
        <p>
          Al acceder y utilizar el sitio web <strong>PALM Health</strong> (https://palmhealth.vercel.app), aceptas cumplir con estos Términos de Uso. Si no estás de acuerdo con alguna parte de estos términos, te pedimos que no utilices nuestro sitio.
        </p>

        <h2>2. Descripción del servicio</h2>
        <p>
          PALM Health es un blog informativo que comparte contenido sobre salud, nutrición, bienestar y hábitos para mejorar la calidad de vida. Todo el contenido es de carácter informativo y educativo.
        </p>

        <h2>3. Descargo de responsabilidad médica</h2>
        <p>
          <strong>Importante:</strong> La información proporcionada en este sitio no sustituye el consejo, diagnóstico o tratamiento médico profesional. Siempre busca el consejo de tu médico u otro profesional de la salud calificado ante cualquier duda sobre una condición médica.
        </p>

        <h2>4. Propiedad intelectual</h2>
        <p>
          Todo el contenido publicado en PALM Health (textos, imágenes, logotipos, gráficos) está protegido por derechos de autor. No puedes reproducir, distribuir ni modificar el contenido sin nuestro consentimiento previo por escrito.
        </p>

        <h2>5. Uso permitido</h2>
        <p>Puedes:</p>
        <ul>
          <li>Leer y compartir los artículos mediante enlaces directos.</li>
          <li>Citar fragmentos breves con atribución y enlace al original.</li>
          <li>Usar el contenido para fines personales y no comerciales.</li>
        </ul>

        <h2>6. Uso prohibido</h2>
        <p>No puedes:</p>
        <ul>
          <li>Reproducir el contenido completo sin autorización.</li>
          <li>Usar el sitio para fines ilegales o no autorizados.</li>
          <li>Intentar acceder a áreas restringidas del sitio.</li>
          <li>Utilizar el contenido para hacer spam o publicidad no solicitada.</li>
        </ul>

        <h2>7. Enlaces a terceros</h2>
        <p>
          Nuestro sitio puede contener enlaces a sitios web de terceros. No nos hacemos responsables del contenido o las prácticas de privacidad de esos sitios.
        </p>

        <h2>8. Modificaciones</h2>
        <p>
          Nos reservamos el derecho de modificar estos Términos de Uso en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio.
        </p>

        <h2>9. Contacto</h2>
        <p>
          Para cualquier pregunta sobre estos Términos de Uso, contáctanos a través de nuestra página de <Link href="/contact" className="text-red-500 hover:underline">Contacto</Link>.
        </p>
      </div>
    </article>
  );
}