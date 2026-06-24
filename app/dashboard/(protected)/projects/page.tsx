import { createAdminClient } from '@/lib/supabase/admin'
import { deleteProject } from '../../_actions/projects'
import { DeleteButton } from '../../_components/DeleteButton'
import Link from 'next/link'

const CATEGORY_COLORS: Record<string, { bg: string; color: string }> = {
  educational:    { bg: '#dbeafe', color: '#1d4ed8' },
  medical:        { bg: '#fce7f3', color: '#be185d' },
  residential:    { bg: '#d1fae5', color: '#065f46' },
  infrastructure: { bg: '#fef3c7', color: '#92400e' },
}

export default async function ProjectsPage() {
  const supabase = createAdminClient()
  const { data: projects } = await supabase
    .from('projects')
    .select('id, slug, title_en, category, location, published')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#163029' }}>Projects</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>{projects?.length ?? 0} total</p>
        </div>
        <Link href="/dashboard/projects/new" style={{
          padding: '0.625rem 1.25rem',
          background: '#E9501C',
          color: '#fff',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '0.875rem',
          whiteSpace: 'nowrap',
        }}>
          + New Project
        </Link>
      </div>

      {(!projects || projects.length === 0) ? (
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '3rem', textAlign: 'center', color: '#9ca3af', fontSize: '0.875rem' }}>
          No projects yet.{' '}
          <Link href="/dashboard/projects/new" style={{ color: '#E9501C', fontWeight: 600 }}>Add the first one.</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {projects.map((p) => {
            const cat = CATEGORY_COLORS[p.category] ?? { bg: '#f3f4f6', color: '#374151' }
            return (
              <div key={p.id} style={{
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.625rem',
              }}>
                {/* Top row: category + status */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{
                    padding: '0.2rem 0.6rem',
                    borderRadius: '50px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    background: cat.bg,
                    color: cat.color,
                  }}>
                    {p.category}
                  </span>
                  <span style={{
                    padding: '0.2rem 0.6rem',
                    borderRadius: '50px',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    background: p.published ? '#dcfce7' : '#fef9c3',
                    color: p.published ? '#16a34a' : '#ca8a04',
                  }}>
                    {p.published ? 'Published' : 'Draft'}
                  </span>
                </div>

                {/* Title + slug */}
                <div>
                  <div style={{ fontWeight: 700, color: '#163029', fontSize: '0.95rem', lineHeight: 1.4 }}>{p.title_en}</div>
                  <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.125rem' }}>{p.slug}</div>
                </div>

                {/* Location */}
                {p.location && (
                  <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>📍 {p.location}</div>
                )}

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid #f3f4f6' }}>
                  <Link href={`/dashboard/projects/${p.id}/edit`} style={{
                    flex: 1,
                    padding: '0.45rem 0',
                    background: '#f3f4f6',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#374151',
                    textAlign: 'center',
                  }}>
                    Edit
                  </Link>
                  <DeleteButton
                    action={deleteProject.bind(null, p.id)}
                    confirmText={`Delete "${p.title_en}"?`}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
