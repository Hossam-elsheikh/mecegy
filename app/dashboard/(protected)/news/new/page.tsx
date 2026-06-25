'use client'

import { useActionState } from 'react'
import { createNews } from '@/app/dashboard/_actions/news'
import { FormField, TextareaField, SectionDivider, FieldRow, SlugField } from '@/app/dashboard/_components/FormField'
import { ImageUploadField } from '@/app/dashboard/_components/ImageUploadField'
import Link from 'next/link'

export default function NewNewsPage() {
  const [error, action, pending] = useActionState(createNews, null)

  return (
    <div style={{ maxWidth: '860px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <Link href="/dashboard/news" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem' }}>← News</Link>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#163029' }}>New Article</h1>
      </div>

      <form action={action}>
        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '0.75rem 1rem', color: '#dc2626', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          <FieldRow>
            <SlugField required />
            <FormField label="Date" name="date" type="date" required />
          </FieldRow>

          <FormField label="LinkedIn URL" name="linkedin_url" />
          <ImageUploadField label="Image" name="image_url" />

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input id="published" name="published" type="checkbox" defaultChecked />
            <label htmlFor="published" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Published</label>
          </div>

          <SectionDivider title="English Content" />
          <FormField label="Title (EN)" name="title_en" required />
          <TextareaField label="Excerpt (EN)" name="excerpt_en" rows={2} />
          <TextareaField label="Full Content (EN)" name="content_en" rows={8} />

          <SectionDivider title="Arabic Content (المحتوى بالعربية)" />
          <FormField label="Title (AR)" name="title_ar" />
          <TextareaField label="Excerpt (AR)" name="excerpt_ar" rows={2} />
          <TextareaField label="Full Content (AR)" name="content_ar" rows={8} />

          <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem', flexWrap: 'wrap' }}>
            <button
              type="submit"
              disabled={pending}
              style={{ padding: '0.625rem 1.5rem', background: pending ? '#9ca3af' : '#E9501C', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '0.9rem', cursor: pending ? 'not-allowed' : 'pointer' }}
            >
              {pending ? 'Creating...' : 'Create Article'}
            </button>
            <Link href="/dashboard/news" style={{ padding: '0.625rem 1.25rem', background: '#f3f4f6', color: '#374151', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
