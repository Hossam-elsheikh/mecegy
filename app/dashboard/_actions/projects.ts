'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'

function parseFeatures(raw: string): string[] {
  return raw.split('\n').map(l => l.trim()).filter(Boolean)
}

function extractFields(formData: FormData) {
  return {
    slug:                 (formData.get('slug') as string).trim(),
    category:             formData.get('category') as string,
    location:             (formData.get('location') as string).trim(),
    image_url:            (formData.get('image_url') as string).trim(),
    title_en:             (formData.get('title_en') as string).trim(),
    title_ar:             (formData.get('title_ar') as string).trim(),
    description_en:       (formData.get('description_en') as string).trim(),
    description_ar:       (formData.get('description_ar') as string).trim(),
    full_description_en:  (formData.get('full_description_en') as string).trim(),
    full_description_ar:  (formData.get('full_description_ar') as string).trim(),
    features_en:          parseFeatures(formData.get('features_en') as string),
    features_ar:          parseFeatures(formData.get('features_ar') as string),
    mec_role_en:          (formData.get('mec_role_en') as string).trim(),
    mec_role_ar:          (formData.get('mec_role_ar') as string).trim(),
    published:            formData.get('published') === 'on',
  }
}

function revalidateAll() {
  revalidatePath('/en/projects', 'page')
  revalidatePath('/ar/projects', 'page')
  revalidatePath('/en', 'page')
  revalidatePath('/ar', 'page')
}

export async function createProject(
  _prevState: string | null,
  formData: FormData
): Promise<string | null> {
  const supabase = createAdminClient()
  const fields = extractFields(formData)
  const { error } = await supabase.from('projects').insert(fields)
  if (error) return error.message
  revalidateAll()
  redirect('/dashboard/projects')
}

export async function updateProject(
  _prevState: string | null,
  formData: FormData
): Promise<string | null> {
  const id = formData.get('id') as string
  const supabase = createAdminClient()
  const fields = extractFields(formData)
  const { error } = await supabase.from('projects').update(fields).eq('id', id)
  if (error) return error.message
  revalidateAll()
  revalidatePath(`/en/projects/${fields.slug}`, 'page')
  revalidatePath(`/ar/projects/${fields.slug}`, 'page')
  redirect('/dashboard/projects')
}

export async function deleteProject(id: string) {
  const supabase = createAdminClient()
  const { data } = await supabase.from('projects').select('slug').eq('id', id).single()
  await supabase.from('projects').delete().eq('id', id)
  revalidateAll()
  if (data?.slug) {
    revalidatePath(`/en/projects/${data.slug}`, 'page')
    revalidatePath(`/ar/projects/${data.slug}`, 'page')
  }
}
