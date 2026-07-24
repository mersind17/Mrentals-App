// Gjeneron HTML statik per route pas `vite build`, që crawler-at të shohin përmbajtje
// unike pa ekzekutuar JS. Kopjon dist/index.html dhe zëvendëson title/meta/canonical/
// JSON-LD dhe bllokun brenda #root. React e merr përsipër faqen sapo montohet.
// Vercel serviron skedarët realë përpara rewrite-it, ndaj këto shkojnë direkt te Google.
import { readFile, writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { SITE, LOCATION_ROUTES, CAR_ROUTES } from './seo-routes.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = join(__dirname, '..', 'dist');

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Zëvendëson përmbajtjen e një tag-u/atributi në HTML-në bazë. */
function applyHead(html, { title, description, canonical, ogTitle, ogImage }) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(
      /(<meta name="description"\s+content=")[\s\S]*?(">)/,
      `$1${esc(description)}$2`
    )
    .replace(
      /(<link rel="canonical" href=")[^"]*(">)/,
      `$1${canonical}$2`
    )
    .replace(
      /(<meta property="og:url" content=")[^"]*(">)/,
      `$1${canonical}$2`
    )
    .replace(
      /(<meta property="og:title" content=")[^"]*(">)/,
      `$1${esc(ogTitle)}$2`
    )
    .replace(
      /(<meta name="twitter:title" content=")[^"]*(">)/,
      `$1${esc(ogTitle)}$2`
    )
    .replace(
      /(<meta property="og:description"\s+content=")[\s\S]*?(">)/,
      `$1${esc(description)}$2`
    )
    .replace(
      /(<meta property="og:image" content=")[^"]*(">)/,
      `$1${ogImage}$2`
    )
    .replace(
      /(<meta name="twitter:image" content=")[^"]*(">)/,
      `$1${ogImage}$2`
    );
}

/**
 * Zëvendëson gjithçka brenda <div id="root">…</div> me bllokun statik të faqes.
 * Index-based (jo regex) sepse Vite e zhvendos <script> në <head> dhe formatimi ndryshon.
 */
function applyBody(html, inner) {
  const startTag = '<div id="root">';
  const start = html.indexOf(startTag);
  const bodyEnd = html.lastIndexOf('</body>');
  const closeIdx = html.lastIndexOf('</div>', bodyEnd);

  if (start === -1 || closeIdx === -1 || closeIdx < start) {
    throw new Error('Nuk u gjet blloku <div id="root">…</div> në dist/index.html');
  }

  return html.slice(0, start + startTag.length) + '\n' + inner + '\n    ' + html.slice(closeIdx);
}

/**
 * Heq FAQPage nga JSON-LD-ja e trashëguar: FAQ-ja duket vetëm te kryefaqja, dhe Google
 * kërkon që structured data të korrespondojë me përmbajtje të dukshme në ATË faqe.
 */
function stripFaqPage(html) {
  return html.replace(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
    (match, body) => {
      const data = JSON.parse(body);
      if (!Array.isArray(data['@graph'])) return match;
      data['@graph'] = data['@graph'].filter((node) => node['@type'] !== 'FAQPage');
      return `<script type="application/ld+json">\n${JSON.stringify(data, null, 2)}\n    </script>`;
    }
  );
}

/** Shton një bllok JSON-LD shtesë përpara </head>. */
function addJsonLd(html, obj) {
  const script = `    <script type="application/ld+json">\n${JSON.stringify(obj, null, 2)}\n    </script>\n`;
  return html.replace('</head>', `${script}</head>`);
}

const staticShell = (inner) => `        <div style="max-width:960px;margin:0 auto;padding:96px 24px;line-height:1.6">
            <img src="/photos/logo.webp" alt="MRentals" width="240" height="28" style="height:28px;width:auto;margin-bottom:40px">
${inner}
        </div>`;

async function writeRoute(routePath, html) {
  const dir = join(dist, routePath);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), html, 'utf8');
  console.log(`✅ /${routePath}`);
}

/**
 * Fut CSS-në brenda HTML-së dhe heq <link rel="stylesheet">.
 * CSS-ja është ~8.6KB dhe bllokonte renderimin ~210ms si kërkesë më vete.
 */
async function inlineCss(html) {
  const m = html.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/);
  if (!m) {
    console.warn('⚠️  Nuk u gjet <link> i CSS-së — po vazhdoj pa inline.');
    return html;
  }
  const css = await readFile(join(dist, m[1]), 'utf8');
  // Replacer si funksion: shmang interpretimin e `$` brenda CSS-së.
  return html.replace(m[0], () => `<style>${css}</style>`);
}

async function main() {
  let base = stripFaqPage(await readFile(join(dist, "index.html"), "utf8"));
  base = await inlineCss(base);
  console.log('🔄 Duke gjeneruar faqet statike...\n');

  // Home-i merr të njëjtin trajtim (CSS inline) — pa të, vetëm nënfaqet do përfitonin.
  await writeFile(join(dist, 'index.html'), base, 'utf8');
  console.log('✅ / (CSS inline)');

  // ---- Faqet per-lokacion ----
  for (const loc of LOCATION_ROUTES) {
    const canonical = `${SITE}/${loc.path}`;
    let html = applyHead(base, {
      title: loc.title,
      description: loc.description,
      canonical,
      ogTitle: loc.title,
      ogImage: `${SITE}/og-image.jpg`,
    });

    const inner = staticShell(
      `            <h1 style="font-size:2rem;font-weight:800;margin-bottom:16px">${esc(loc.h1)}</h1>
            <p style="color:#c9d6cf;margin-bottom:32px">${esc(loc.intro)}</p>
${loc.sections
  .map(
    (s) =>
      `            <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:8px">${esc(s.title)}</h2>\n            <p style="color:#c9d6cf;margin-bottom:24px">${esc(s.body)}</p>`
  )
  .join('\n')}
            <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:8px">Flota jonë</h2>
            <ul style="color:#c9d6cf;margin-bottom:24px;padding-left:20px">
${CAR_ROUTES.map(
  (c) => `                <li><a href="/makina/${c.id}" style="color:#acc8a2">${esc(c.name)} (${c.year})</a> — ${c.price}€/ditë</li>`
).join('\n')}
            </ul>
            <p style="color:#c9d6cf">Rezervoni përmes WhatsApp: <a href="https://wa.me/355695169873" style="color:#acc8a2">+355 69 516 9873</a></p>`
    );

    html = applyBody(html, inner);
    html = addJsonLd(html, {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          '@id': `${canonical}#service`,
          name: loc.h1,
          description: loc.description,
          serviceType: 'Car rental',
          provider: { '@id': `${SITE}/#business` },
          areaServed: { '@type': 'Place', name: loc.name },
          url: canonical,
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Kryefaqja', item: `${SITE}/` },
            { '@type': 'ListItem', position: 2, name: loc.h1, item: canonical },
          ],
        },
      ],
    });

    await writeRoute(loc.path, html);
  }

  // ---- Faqet per-makinë ----
  for (const car of CAR_ROUTES) {
    const canonical = `${SITE}/makina/${car.id}`;
    const title = `${car.name} me Qera — ${car.price}€/ditë | MRentals`;
    const image = `${SITE}/photos/${car.image}-1600.webp`;

    let html = applyHead(base, {
      title,
      description: car.seoText,
      canonical,
      ogTitle: title,
      ogImage: image,
    });

    const inner = staticShell(
      `            <h1 style="font-size:2rem;font-weight:800;margin-bottom:16px">${esc(car.name)} me Qera</h1>
            <p style="color:#acc8a2;font-size:1.5rem;font-weight:800;margin-bottom:24px">${car.price}€ / ditë</p>
            <p style="color:#c9d6cf;margin-bottom:32px">${esc(car.seoText)}</p>
            <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:8px">Specifikimet</h2>
            <ul style="color:#c9d6cf;margin-bottom:24px;padding-left:20px">
                <li>Viti: ${car.year}</li>
                <li>Kambio: ${esc(car.transmission)}</li>
                <li>Karburanti: ${esc(car.fuel)}</li>
                <li>Vende: ${car.seats}</li>
            </ul>
            <p style="color:#c9d6cf;margin-bottom:24px">Rezervoni ${esc(car.name)} përmes WhatsApp: <a href="https://wa.me/355695169873" style="color:#acc8a2">+355 69 516 9873</a>. Marrje në Elbasan, Tiranë ose Aeroportin e Rinasit.</p>
            <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:8px">Makina të tjera</h2>
            <ul style="color:#c9d6cf;padding-left:20px">
${CAR_ROUTES.filter((c) => c.id !== car.id)
  .map((c) => `                <li><a href="/makina/${c.id}" style="color:#acc8a2">${esc(c.name)}</a> — ${c.price}€/ditë</li>`)
  .join('\n')}
            </ul>`
    );

    html = applyBody(html, inner);
    html = addJsonLd(html, {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Product',
          '@id': `${canonical}#product`,
          name: `${car.name} ${car.year}`,
          description: car.seoText,
          image,
          brand: { '@type': 'Brand', name: car.name.split(' ')[0] },
          offers: {
            '@type': 'Offer',
            url: canonical,
            price: String(car.price),
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: String(car.price),
              priceCurrency: 'EUR',
              unitCode: 'DAY',
            },
            seller: { '@id': `${SITE}/#business` },
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Kryefaqja', item: `${SITE}/` },
            { '@type': 'ListItem', position: 2, name: 'Flota', item: `${SITE}/#cars` },
            { '@type': 'ListItem', position: 3, name: car.name, item: canonical },
          ],
        },
      ],
    });

    await writeRoute(`makina/${car.id}`, html);
  }

  console.log(`\n🎉 U gjeneruan ${LOCATION_ROUTES.length + CAR_ROUTES.length} faqe statike (+ home).`);
}

main().catch((err) => {
  console.error('❌ Prerender dështoi:', err);
  process.exit(1);
});
