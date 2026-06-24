/**
 * Seed script — migrates existing JSON data to Supabase
 * Run once after applying supabase/schema.sql:
 *   node scripts/seed.mjs
 */

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const en = JSON.parse(readFileSync(resolve(root, 'app/[lang]/dictionaries/en.json'), 'utf8'))
const ar = JSON.parse(readFileSync(resolve(root, 'app/[lang]/dictionaries/ar.json'), 'utf8'))

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars.')
  console.error('Run: NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/seed.mjs')
  process.exit(1)
}

async function upsert(table, rows) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      Prefer: 'resolution=merge-duplicates',
    },
    body: JSON.stringify(rows),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Failed to upsert ${table}: ${res.status} ${body}`)
  }
}

// ── Projects ──────────────────────────────────────────────────────────────────
const arProjectMap = Object.fromEntries(ar.projects.items.map(p => [p.slug, p]))

const projects = en.projects.items.map(p => {
  const a = arProjectMap[p.slug] || {}
  return {
    slug:                  p.slug,
    category:              p.category,
    location:              p.location,
    image_url:             p.image,
    title_en:              p.title,
    title_ar:              a.title || '',
    description_en:        p.description,
    description_ar:        a.description || '',
    full_description_en:   p.fullDescription,
    full_description_ar:   a.fullDescription || '',
    features_en:           p.features || [],
    features_ar:           a.features || [],
    mec_role_en:           p.mecRole,
    mec_role_ar:           a.mecRole || '',
    published:             true,
  }
})

// ── News ──────────────────────────────────────────────────────────────────────
const arNewsMap = Object.fromEntries(ar.news.items.map(n => [n.slug, n]))

const news = en.news.items.map(n => {
  const a = arNewsMap[n.slug] || {}
  return {
    slug:         n.slug,
    date:         n.date,
    image_url:    n.image,
    linkedin_url: n.linkedin,
    title_en:     n.title,
    title_ar:     a.title || '',
    excerpt_en:   n.excerpt,
    excerpt_ar:   a.excerpt || '',
    content_en:   n.content,
    content_ar:   a.content || '',
    published:    true,
  }
})

// ── Insert ────────────────────────────────────────────────────────────────────
console.log(`Seeding ${projects.length} projects and ${news.length} news items...`)

await upsert('projects', projects)
console.log(`✓ Projects seeded`)

await upsert('news', news)
console.log(`✓ News seeded`)

console.log('Done.')
