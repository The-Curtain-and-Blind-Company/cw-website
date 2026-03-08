import { createClient } from '@sanity/client'
import { parseArgs } from 'util'

const client = createClient({
  projectId: 'r252l6ei',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// All 155 page URLs from sitemap
const PAGE_SITEMAP = 'https://curtainworld.com.au/page-sitemap.xml'
const POST_SITEMAP = 'https://curtainworld.com.au/post-sitemap.xml'

async function fetchSitemapUrls(sitemapUrl) {
  const res = await fetch(sitemapUrl)
  const xml = await res.text()
  const urls = []
  const regex = /<loc>(.*?)<\/loc>/g
  let match
  while ((match = regex.exec(xml))) urls.push(match[1])
  return urls
}

async function scrapePageMeta(url) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; CWMigration/1.0)' },
    })
    if (!res.ok) return null
    const html = await res.text()

    const title = html.match(/<title[^>]*>(.*?)<\/title>/is)?.[1]?.trim() || ''
    const metaDesc = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/is)?.[1] || ''
    const ogTitle = html.match(/<meta\s+property=["']og:title["']\s+content=["'](.*?)["']/is)?.[1] || ''
    const ogDesc = html.match(/<meta\s+property=["']og:description["']\s+content=["'](.*?)["']/is)?.[1] || ''
    const ogImage = html.match(/<meta\s+property=["']og:image["']\s+content=["'](.*?)["']/is)?.[1] || ''
    const h1 = html.match(/<h1[^>]*>(.*?)<\/h1>/is)?.[1]?.replace(/<[^>]+>/g, '').trim() || ''
    const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/is)?.[1] || ''

    // Extract main content area (rough — between <main> or <article> tags, or .entry-content)
    const mainContent = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1]
      || html.match(/<article[^>]*>([\s\S]*?)<\/article>/i)?.[1]
      || html.match(/class=["']entry-content["'][^>]*>([\s\S]*?)<\/div>/i)?.[1]
      || ''

    // Strip HTML for plain text excerpt
    const plainText = mainContent.replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 2000)

    return {
      title: ogTitle || title,
      metaDescription: ogDesc || metaDesc,
      h1,
      ogImage,
      canonical,
      plainText,
      contentLength: mainContent.length,
    }
  } catch (err) {
    console.error(`  ❌ Failed to scrape ${url}: ${err.message}`)
    return null
  }
}

function slugFromUrl(url) {
  const path = new URL(url).pathname.replace(/^\/|\/$/g, '')
  return path || 'homepage'
}

function categorizeUrl(url) {
  const path = new URL(url).pathname
  if (path.match(/^\/mobile-showroom\/[^/]+/)) return 'suburb'
  if (path.match(/^\/curtains\//)) return 'product'
  if (path.match(/^\/blinds-perth\//)) return 'product'
  if (path.match(/^\/plantation-shutters/)) return 'product'
  if (path.match(/^\/outdoor\//)) return 'product'
  if (path.match(/^\/motorised\//)) return 'product'
  if (path.match(/^\/norman-blinds\//)) return 'product'
  if (path.match(/^\/zipscreen|cafe-bistro|alfresco|patio|sunshade/)) return 'product'
  return 'page'
}

function productCategory(url) {
  const path = new URL(url).pathname
  if (path.startsWith('/curtains')) return 'curtains'
  if (path.startsWith('/blinds-perth')) return 'blinds'
  if (path.startsWith('/plantation-shutters')) return 'shutters'
  if (path.startsWith('/outdoor') || path.match(/cafe-bistro|alfresco|patio|sunshade|zipscreen/)) return 'outdoor'
  if (path.startsWith('/motorised')) return 'motorised'
  if (path.startsWith('/norman-blinds')) return 'norman'
  return 'blinds'
}

async function importPages(urls, dryRun = false) {
  let imported = 0, skipped = 0, errors = 0

  for (const url of urls) {
    const slug = slugFromUrl(url)
    const type = categorizeUrl(url)

    // Skip homepage (already seeded)
    if (slug === 'homepage' || slug === '') { skipped++; continue }

    console.log(`\n📄 ${type.toUpperCase()} ${slug}`)
    const meta = await scrapePageMeta(url)
    if (!meta) { errors++; continue }

    console.log(`  Title: ${meta.title?.substring(0, 60)}`)
    console.log(`  H1: ${meta.h1?.substring(0, 60)}`)
    console.log(`  Desc: ${meta.metaDescription?.substring(0, 60)}`)
    console.log(`  Content: ${meta.contentLength} chars`)

    if (dryRun) { imported++; continue }

    try {
      if (type === 'suburb') {
        const suburbName = slug.replace('mobile-showroom/', '').replace(/-/g, ' ')
          .replace(/\b\w/g, c => c.toUpperCase())

        await client.createOrReplace({
          _id: `suburb-${slug.replace(/\//g, '-')}`,
          _type: 'suburb',
          name: suburbName,
          slug: { _type: 'slug', current: slug.replace('mobile-showroom/', '') },
          seoTitle: (meta.title || '').substring(0, 60),
          seoDescription: (meta.metaDescription || '').substring(0, 160),
          description: meta.plainText ? [{
            _type: 'block',
            _key: 'desc1',
            style: 'normal',
            children: [{ _type: 'span', _key: 's1', text: meta.plainText.substring(0, 1000) }],
            markDefs: [],
          }] : undefined,
        })
      } else if (type === 'product') {
        await client.createOrReplace({
          _id: `product-${slug.replace(/\//g, '-')}`,
          _type: 'product',
          title: meta.h1 || meta.title?.split('|')[0]?.trim() || slug,
          slug: { _type: 'slug', current: slug },
          category: productCategory(url),
          shortDescription: meta.metaDescription || '',
          seoTitle: (meta.title || '').substring(0, 60),
          seoDescription: (meta.metaDescription || '').substring(0, 160),
          body: meta.plainText ? [{
            _type: 'block',
            _key: 'body1',
            style: 'normal',
            children: [{ _type: 'span', _key: 's1', text: meta.plainText.substring(0, 2000) }],
            markDefs: [],
          }] : undefined,
        })
      } else {
        await client.createOrReplace({
          _id: `page-${slug.replace(/\//g, '-')}`,
          _type: 'page',
          title: meta.h1 || meta.title?.split('|')[0]?.trim() || slug,
          slug: { _type: 'slug', current: slug },
          heroHeadline: meta.h1 || '',
          seoTitle: (meta.title || '').substring(0, 60),
          seoDescription: (meta.metaDescription || '').substring(0, 160),
          body: meta.plainText ? [{
            _type: 'block',
            _key: 'body1',
            style: 'normal',
            children: [{ _type: 'span', _key: 's1', text: meta.plainText.substring(0, 2000) }],
            markDefs: [],
          }] : undefined,
        })
      }
      imported++
      console.log(`  ✅ Imported`)
    } catch (err) {
      console.error(`  ❌ Error: ${err.message}`)
      errors++
    }

    // Rate limit — be gentle
    await new Promise(r => setTimeout(r, 300))
  }

  return { imported, skipped, errors }
}

async function importPosts(urls, dryRun = false) {
  let imported = 0, errors = 0

  for (const url of urls) {
    const slug = slugFromUrl(url)
    console.log(`\n✍️ POST ${slug}`)

    const meta = await scrapePageMeta(url)
    if (!meta) { errors++; continue }

    console.log(`  Title: ${meta.title?.substring(0, 60)}`)

    if (dryRun) { imported++; continue }

    try {
      await client.createOrReplace({
        _id: `blog-${slug.replace(/\//g, '-')}`,
        _type: 'blogPost',
        title: meta.h1 || meta.title?.split('|')[0]?.trim() || slug,
        slug: { _type: 'slug', current: slug },
        excerpt: (meta.metaDescription || meta.plainText?.substring(0, 200) || ''),
        seoTitle: (meta.title || '').substring(0, 60),
        seoDescription: (meta.metaDescription || '').substring(0, 160),
        body: meta.plainText ? [{
          _type: 'block',
          _key: 'body1',
          style: 'normal',
          children: [{ _type: 'span', _key: 's1', text: meta.plainText.substring(0, 2000) }],
          markDefs: [],
        }] : undefined,
      })
      imported++
      console.log(`  ✅ Imported`)
    } catch (err) {
      console.error(`  ❌ Error: ${err.message}`)
      errors++
    }

    await new Promise(r => setTimeout(r, 300))
  }

  return { imported, errors }
}

async function main() {
  const { values } = parseArgs({
    options: {
      'dry-run': { type: 'boolean', default: false },
      'posts-only': { type: 'boolean', default: false },
      'pages-only': { type: 'boolean', default: false },
    },
  })
  const dryRun = values['dry-run']

  if (dryRun) console.log('🔍 DRY RUN — no data will be written\n')

  if (!values['posts-only']) {
    console.log('📋 Fetching page sitemap...')
    const pageUrls = await fetchSitemapUrls(PAGE_SITEMAP)
    console.log(`Found ${pageUrls.length} pages\n`)

    const pageResult = await importPages(pageUrls, dryRun)
    console.log(`\n📊 Pages: ${pageResult.imported} imported, ${pageResult.skipped} skipped, ${pageResult.errors} errors`)
  }

  if (!values['pages-only']) {
    console.log('\n📋 Fetching post sitemap...')
    const postUrls = await fetchSitemapUrls(POST_SITEMAP)
    console.log(`Found ${postUrls.length} posts\n`)

    const postResult = await importPosts(postUrls, dryRun)
    console.log(`\n📊 Posts: ${postResult.imported} imported, ${postResult.errors} errors`)
  }

  console.log('\n🎉 Import complete!')
}

main().catch(console.error)
