'use client'

import { useActionState } from 'react'
import { updateProject } from '@/app/dashboard/_actions/projects'
import { FormField, TextareaField, SectionDivider, FieldRow, SlugField } from '@/app/dashboard/_components/FormField'
import { ImageUploadField } from '@/app/dashboard/_components/ImageUploadField'
import Link from 'next/link'

const CATEGORIES = ['educational', 'medical', 'residential', 'infrastructure']

interface Project {
  id: string
  slug: string
  category: string
  location: string | null
  image_url: string | null
  title_en: string
  title_ar: string
  description_en: string | null
  description_ar: string | null
  full_description_en: string | null
  full_description_ar: string | null
  features_en: string[]
  features_ar: string[]
  mec_role_en: string | null
  mec_role_ar: string | null
  published: boolean
}

export function EditProjectForm({ project }: { project: Project }) {
  const [error, action, pending] = useActionState(updateProject, null)

  return (
    <form action={action}>
      <input type="hidden" name="id" value={project.id} />

      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '0.75rem 1rem', color: '#dc2626', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          {error}
        </div>
      )}

      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

        <FieldRow>
          <SlugField required defaultValue={project.slug} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <label htmlFor="category" style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151' }}>
              Category <span style={{ color: '#E9501C' }}>*</span>
            </label>
            <select id="category" name="category" required defaultValue={project.category} style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: '8px', padding: '0.5rem 0.75rem', fontSize: '0.875rem', background: '#fff', boxSizing: 'border-box' }}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </FieldRow>

        <FormField label="Location" name="location" defaultValue={project.location ?? ''} />
        <ImageUploadField label="Image" name="image_url" defaultValue={project.image_url ?? ''} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input id="published" name="published" type="checkbox" defaultChecked={project.published} />
          <label htmlFor="published" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Published</label>
        </div>

        <SectionDivider title="English Content" />
        <FormField label="Title (EN)" name="title_en" required defaultValue={project.title_en} />
        <TextareaField label="Short Description (EN)" name="description_en" rows={2} defaultValue={project.description_en ?? ''} />
        <TextareaField label="Full Description (EN)" name="full_description_en" rows={5} defaultValue={project.full_description_en ?? ''} />
        <TextareaField label="Features (EN)" name="features_en" rows={4} hint="One feature per line" defaultValue={(project.features_en ?? []).join('\n')} />
        <TextareaField label="MEC Role (EN)" name="mec_role_en" rows={3} defaultValue={project.mec_role_en ?? ''} />

        <SectionDivider title="Arabic Content (المحتوى بالعربية)" />
        <FormField label="Title (AR)" name="title_ar" defaultValue={project.title_ar} />
        <TextareaField label="Short Description (AR)" name="description_ar" rows={2} defaultValue={project.description_ar ?? ''} />
        <TextareaField label="Full Description (AR)" name="full_description_ar" rows={5} defaultValue={project.full_description_ar ?? ''} />
        <TextareaField label="Features (AR)" name="features_ar" rows={4} hint="سطر واحد لكل ميزة" defaultValue={(project.features_ar ?? []).join('\n')} />
        <TextareaField label="MEC Role (AR)" name="mec_role_ar" rows={3} defaultValue={project.mec_role_ar ?? ''} />

        <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem', flexWrap: 'wrap' }}>
          <button
            type="submit"
            disabled={pending}
            style={{ padding: '0.625rem 1.5rem', background: pending ? '#9ca3af' : '#E9501C', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '0.9rem', cursor: pending ? 'not-allowed' : 'pointer' }}
          >
            {pending ? 'Saving...' : 'Save Changes'}
          </button>
          <Link href="/dashboard/projects" style={{ padding: '0.625rem 1.25rem', background: '#f3f4f6', color: '#374151', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
            Cancel
          </Link>
        </div>
      </div>
    </form>
  )
}
