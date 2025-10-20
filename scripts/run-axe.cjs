/*
Minimal axe-core + puppeteer runner.
Roda contra URL em process.env.URL ou http://localhost:3000
Gera reports/axe-home.json e sai com código 2 se houver violações color-contrast.
*/
const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('@axe-core/puppeteer');
(async ()=>{
  const url = process.env.URL || 'http://localhost:3000';
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  const results = await new AxePuppeteer(page).analyze();
  const fs = require('fs');
  fs.mkdirSync('reports', { recursive: true });
  fs.writeFileSync('reports/axe-home.json', JSON.stringify(results, null, 2));
  const violations = results.violations.filter(v => v.id === 'color-contrast');
  console.log('color-contrast violations:', violations.length);
  await browser.close();
  if (violations.length > 0) process.exit(2);
  process.exit(0);
})();
