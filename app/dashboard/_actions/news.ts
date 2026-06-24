'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'

function extractFields(formData: FormData) {
  return {
    slug:         (formData.get('slug') as string).trim(),
    date:         formData.get('date') as string,
    image_url:    (formData.get('image_url') as string).trim(),
    linkedin_url: (formData.get('linkedin_url') as string).trim(),
    title_en:     (formData.get('title_en') as string).trim(),
    title_ar:     (formData.get('title_ar') as string).trim(),
    excerpt_en:   (formData.get('excerpt_en') as string).trim(),
    excerpt_ar:   (formData.get('excerpt_ar') as string).trim(),
    content_en:   (formData.get('content_en') as string).trim(),
    content_ar:   (formData.get('content_ar') as string).trim(),
    published:    formData.get('published') === 'on',
  }
}

function revalidateAll() {
  revalidatePath('/en/news', 'page')
  revalidatePath('/ar/news', 'page')
  revalidatePath('/en', 'page')
  revalidatePath('/ar', 'page')
}

export async function createNews(
  _prevState: string | null,
  formData: FormData
): Promise<string | null> {
  const supabase = createAdminClient()
  const fields = extractFields(formData)
  const { error } = await supabase.from('news').insert(fields)
  if (error) return error.message
  revalidateAll()
  redirect('/dashboard/news')
}

export async function updateNews(
  _prevState: string | null,
  formData: FormData
): Promise<string | null> {
  const id = formData.get('id') as string
  const supabase = createAdminClient()
  const fields = extractFields(formData)
  const { error } = await supabase.from('news').update(fields).eq('id', id)
  if (error) return error.message
  revalidateAll()
  revalidatePath(`/en/news/${fields.slug}`, 'page')
  revalidatePath(`/ar/news/${fields.slug}`, 'page')
  redirect('/dashboard/news')
}

export async function deleteNews(id: string) {
  const supabase = createAdminClient()
  const { data } = await supabase.from('news').select('slug').eq('id', id).single()
  await supabase.from('news').delete().eq('id', id)
  revalidateAll()
  if (data?.slug) {
    revalidatePath(`/en/news/${data.slug}`, 'page')
    revalidatePath(`/ar/news/${data.slug}`, 'page')
  }
}
