const fs = require('fs');
const path = require('path');

// Función para generar slug desde un título
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Ejemplo de migración
const posts = [
  {
    title: "Test Mental",
    date: "2026-08-16",
    category: "SALUD MENTAL",
    excerpt: "Test Mental Gratis para evaluar tu salud mental",
    content: "Contenido del post...",
  },
  // Agrega más posts aquí
];

posts.forEach(post => {
  const slug = generateSlug(post.title);
  const content = `---
title: "${post.title}"
date: "${post.date}"
category: "${post.category}"
excerpt: "${post.excerpt}"
author: "AL HAPPY"
---

${post.content}
`;

  fs.writeFileSync(
    path.join(__dirname, '../content/posts', `${slug}.mdx`),
    content
  );
  
  console.log(`✓ Creado: ${slug}.mdx`);
});