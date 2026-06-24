import { createAdminClient } from '@/lib/supabase/admin'
import { notFound } from 'next/navigation'
import { EditNewsForm } from './EditNewsForm'
import Link from 'next/link'

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createAdminClient()
  const { data: article } = await supabase.from('news').select('*').eq('id', id).single()
  if (!article) notFound()

  return (
    <div style={{ maxWidth: '860px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <Link href="/dashboard/news" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem' }}>← News</Link>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#163029' }}>Edit Article</h1>
      </div>
      <EditNewsForm article={article} />
    </div>
  )
}
