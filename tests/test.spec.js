import { test, expect } from '@playwright/test';
import { routes } from '../utils/utils.js';

const verifyMetaTags = async (page, route) => {
  await page.goto(route);
  const title = await page.title();
  const metaDescription = await page.$('meta[data-react-helmet="true"][name="description"]');
  const h1 = await page.$('h1');

  if (title) {
    console.log('\x1b[32m%s\x1b[0m', `Título encontrado en ${route}: "${title}"`);
  } else {
    console.log('\x1b[31m%s\x1b[0m', `No se encontró el tag <title> en la página ${route}.`);
  }

  if (metaDescription) {
    const descriptionContent = await metaDescription.getAttribute('content');
    console.log('\x1b[32m%s\x1b[0m', `Descripción encontrada en ${route}: "${descriptionContent}"`);
  } else {
    console.log('\x1b[31m%s\x1b[0m', `No se encontró el meta tag de descripción en la página ${route}.`);
  }

  if (h1) {
    const h1Content = await h1.textContent();
    console.log('\x1b[32m%s\x1b[0m', `El contenido del h1 en ${route} es: "${h1Content}"`);
  } else {
    console.log('\x1b[31m%s\x1b[0m', `No se encontró el tag <h1> en la página ${route}.`);
  }
};

routes.forEach(route => {
  test(`Verificar meta tags en ${route}`, async ({ page }) => {
    await verifyMetaTags(page, route);
  });
});
