'use client'

import { useActionState } from 'react'
import { updateNews } from '@/app/dashboard/_actions/news'
import { FormField, TextareaField, SectionDivider, FieldRow, SlugField } from '@/app/dashboard/_components/FormField'
import { ImageUploadField } from '@/app/dashboard/_components/ImageUploadField'
import Link from 'next/link'

interface Article {
  id: string
  slug: string
  date: string
  image_url: string | null
  linkedin_url: string | null
  title_en: string
  title_ar: string
  excerpt_en: string | null
  excerpt_ar: string | null
  content_en: string | null
  content_ar: string | null
  published: boolean
}

export function EditNewsForm({ article }: { article: Article }) {
  const [error, action, pending] = useActionState(updateNews, null)

  return (
    <form action={action}>
      <input type="hidden" name="id" value={article.id} />

      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '0.75rem 1rem', color: '#dc2626', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          {error}
        </div>
      )}

      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

        <FieldRow>
          <SlugField required defaultValue={article.slug} />
          <FormField label="Date" name="date" type="date" required defaultValue={article.date} />
        </FieldRow>

        <FormField label="LinkedIn URL" name="linkedin_url" defaultValue={article.linkedin_url ?? ''} />
        <ImageUploadField label="Image" name="image_url" defaultValue={article.image_url ?? ''} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input id="published" name="published" type="checkbox" defaultChecked={article.published} />
          <label htmlFor="published" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Published</label>
        </div>

        <SectionDivider title="English Content" />
        <FormField label="Title (EN)" name="title_en" required defaultValue={article.title_en} />
        <TextareaField label="Excerpt (EN)" name="excerpt_en" rows={2} defaultValue={article.excerpt_en ?? ''} />
        <TextareaField label="Full Content (EN)" name="content_en" rows={8} defaultValue={article.content_en ?? ''} />

        <SectionDivider title="Arabic Content (المحتوى بالعربية)" />
        <FormField label="Title (AR)" name="title_ar" defaultValue={article.title_ar} />
        <TextareaField label="Excerpt (AR)" name="excerpt_ar" rows={2} defaultValue={article.excerpt_ar ?? ''} />
        <TextareaField label="Full Content (AR)" name="content_ar" rows={8} defaultValue={article.content_ar ?? ''} />

        <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem', flexWrap: 'wrap' }}>
          <button
            type="submit"
            disabled={pending}
            style={{ padding: '0.625rem 1.5rem', background: pending ? '#9ca3af' : '#E9501C', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '0.9rem', cursor: pending ? 'not-allowed' : 'pointer' }}
          >
            {pending ? 'Saving...' : 'Save Changes'}
          </button>
          <Link href="/dashboard/news" style={{ padding: '0.625rem 1.25rem', background: '#f3f4f6', color: '#374151', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
            Cancel
          </Link>
        </div>
      </div>
    </form>
  )
}
