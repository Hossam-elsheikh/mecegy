import { createAdminClient } from '@/lib/supabase/admin'
import { deleteNews } from '../../_actions/news'
import { DeleteButton } from '../../_components/DeleteButton'
import Link from 'next/link'

export default async function NewsPage() {
  const supabase = createAdminClient()
  const { data: articles } = await supabase
    .from('news')
    .select('id, slug, title_en, date, published')
    .order('date', { ascending: false })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#163029' }}>News</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>{articles?.length ?? 0} total</p>
        </div>
        <Link href="/dashboard/news/new" style={{
          padding: '0.625rem 1.25rem',
          background: '#E9501C',
          color: '#fff',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '0.875rem',
          whiteSpace: 'nowrap',
        }}>
          + New Article
        </Link>
      </div>

      {(!articles || articles.length === 0) ? (
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '3rem', textAlign: 'center', color: '#9ca3af', fontSize: '0.875rem' }}>
          No articles yet.{' '}
          <Link href="/dashboard/news/new" style={{ color: '#E9501C', fontWeight: 600 }}>Add the first one.</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {articles.map((a) => (
            <div key={a.id} style={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.625rem',
            }}>
              {/* Top row: date + status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#E9501C' }}>{a.date}</span>
                <span style={{
                  padding: '0.2rem 0.6rem',
                  borderRadius: '50px',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  background: a.published ? '#dcfce7' : '#fef9c3',
                  color: a.published ? '#16a34a' : '#ca8a04',
                }}>
                  {a.published ? 'Published' : 'Draft'}
                </span>
              </div>

              {/* Title + slug */}
              <div>
                <div style={{ fontWeight: 700, color: '#163029', fontSize: '0.95rem', lineHeight: 1.4 }}>{a.title_en}</div>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.125rem' }}>{a.slug}</div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid #f3f4f6' }}>
                <Link href={`/dashboard/news/${a.id}/edit`} style={{
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
                  action={deleteNews.bind(null, a.id)}
                  confirmText={`Delete "${a.title_en}"?`}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
