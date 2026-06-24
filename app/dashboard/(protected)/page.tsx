import { createAdminClient } from '@/lib/supabase/admin'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = createAdminClient()
  const [
    { count: projectCount },
    { count: newsCount },
    { count: draftCount },
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('published', true),
    supabase.from('news').select('*', { count: 'exact', head: true }).eq('published', true),
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('published', false),
  ])

  const stats = [
    { label: 'Published Projects', value: projectCount ?? 0, href: '/dashboard/projects' },
    { label: 'Published News', value: newsCount ?? 0, href: '/dashboard/news' },
    { label: 'Draft Projects', value: draftCount ?? 0, href: '/dashboard/projects' },
  ]

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#163029', marginBottom: '0.25rem' }}>Overview</h1>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Manage MEC website content</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
        {stats.map(({ label, value, href }) => (
          <Link key={label} href={href} style={{ textDecoration: 'none' }}>
            <div style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '1.25rem 1.5rem',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              border: '1px solid #e5e7eb',
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#E9501C' }}>{value}</div>
              <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '0.25rem' }}>{label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link href="/dashboard/projects/new" style={{
          display: 'inline-block',
          padding: '0.625rem 1.25rem',
          background: '#E9501C',
          color: '#fff',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '0.9rem',
        }}>
          + New Project
        </Link>
        <Link href="/dashboard/news/new" style={{
          display: 'inline-block',
          padding: '0.625rem 1.25rem',
          background: '#163029',
          color: '#fff',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '0.9rem',
        }}>
          + New Article
        </Link>
      </div>
    </div>
  )
}
