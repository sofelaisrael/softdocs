const { chromium } = require('playwright');
const path = require('path');

const defaultPages = [
  { url: '/', name: 'home' },
  { url: '/docs/3.0/configuration', name: 'docs-config' },
  { url: '/docs/3.0/getting-started', name: 'docs-getting-started' },
  { url: '/docs/3.0/guides/versioning', name: 'docs-versioning' },
  { url: '/docs/3.0/reference/api', name: 'docs-api' },
  { url: '/changelog', name: 'changelog' },
  { url: '/pricing', name: 'pricing' },
  { url: '/components', name: 'components' },
];

async function verify(pages = defaultPages) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const results = [];
  for (const p of pages) {
    try {
      await page.goto(`http://localhost:3000${p.url}`, {
        waitUntil: 'networkidle',
        timeout: 30000,
      });
      await page.screenshot({
        path: path.join('proof', `${p.name}.png`),
        fullPage: false,
      });
      results.push({ name: p.name, status: 'pass' });
    } catch (e) {
      results.push({ name: p.name, status: 'fail', error: e.message });
    }
  }

  await browser.close();

  const passed = results.filter((r) => r.status === 'pass').length;
  const failed = results.filter((r) => r.status === 'fail').length;

  console.log(JSON.stringify({ passed, failed, results }, null, 2));

  if (failed > 0) {
    process.exit(1);
  }
}

// Parse CLI args
const args = process.argv.slice(2);
const pageIndex = args.indexOf('--page');
const nameIndex = args.indexOf('--name');

if (pageIndex !== -1) {
  const url = args[pageIndex + 1].startsWith('/') ? args[pageIndex + 1] : `/${args[pageIndex + 1]}`;
  const name = nameIndex !== -1 ? args[nameIndex + 1] : 'custom';
  verify([{ url, name }]);
} else {
  verify();
}
