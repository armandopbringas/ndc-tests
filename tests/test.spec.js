import { test, expect } from '@playwright/test';
import { routes } from '../utils/utils.js';

routes.forEach(route => {
  
  test.describe(`Verificar meta tags en ${route}`, () => {
    
    test(`Debe tener un <title> en ${route}`, async ({ page }) => {
      await page.goto(route);
      const title = await page.title();
      console.log('\x1b[32m%s\x1b[0m', `<title> encontrado en ${route}: "${title}"`);
      await expect(title).not.toBeNull();
    });

    test(`Debe tener meta descripción en ${route}`, async ({ page }) => {
      await page.goto(route);
      const metaDescription = await page.locator('meta[data-react-helmet="true"][name="description"]');
      const descriptionContent = await metaDescription.getAttribute('content');
      console.log(descriptionContent
        ? `\x1b[32mDescripción encontrada en ${route}: "${descriptionContent}"\x1b[0m`
        : `\x1b[31mNo se encontró el meta tag de descripción en la página ${route}.\x1b[0m`);
      await expect(metaDescription).toHaveAttribute('content', /.*/);
    });

    test(`Debe tener al menos un <h1> en ${route}`, async ({ page }) => {
      await page.goto(route);
      const h1Elements = await page.locator('h1');
      const h1Count = await h1Elements.count();
      expect(h1Count).toBeGreaterThan(0);
      
      for (let i = 0; i < h1Count; i++) {
        const h1Content = await h1Elements.nth(i).textContent();
        console.log(`\x1b[32mContenido del h1 #${i + 1} en ${route}: "${h1Content}"\x1b[0m`);
        await expect(h1Elements.nth(i)).toHaveText(/.+/); // Fallará si <h1> está vacío
      }
    });
  });
});
