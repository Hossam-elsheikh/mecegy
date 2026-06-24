import { createAdminClient } from '@/lib/supabase/admin'
import { notFound } from 'next/navigation'
import { EditProjectForm } from './EditProjectForm'
import Link from 'next/link'

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createAdminClient()
  const { data: project } = await supabase.from('projects').select('*').eq('id', id).single()
  if (!project) notFound()

  return (
    <div style={{ maxWidth: '860px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <Link href="/dashboard/projects" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem' }}>← Projects</Link>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#163029' }}>Edit Project</h1>
      </div>
      <EditProjectForm project={project} />
    </div>
  )
}
