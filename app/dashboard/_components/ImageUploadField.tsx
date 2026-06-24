'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'

export function ImageUploadField({
  name = 'image_url',
  defaultValue = '',
  label = 'Image',
}: {
  name?: string
  defaultValue?: string
  label?: string
}) {
  const [url, setUrl] = useState(defaultValue)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')

    const supabase = createClient()
    const ext = file.name.split('.').pop()
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filename, file, { upsert: false })

    if (uploadError) {
      setError(uploadError.message)
      setUploading(false)
      return
    }

    const { data } = supabase.storage.from('images').getPublicUrl(filename)
    setUrl(data.publicUrl)
    setUploading(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151' }}>{label}</span>

      {/* Hidden input carries the URL into the form */}
      <input type="hidden" name={name} value={url} />

      {/* Preview */}
      {url && (
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/7', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e5e7eb', background: '#f9fafb' }}>
          <Image src={url} alt="Preview" fill style={{ objectFit: 'cover' }} sizes="860px" />
          <button
            type="button"
            onClick={() => { setUrl(''); if (inputRef.current) inputRef.current.value = '' }}
            style={{
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
              background: 'rgba(0,0,0,0.55)',
              border: 'none',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              color: '#fff',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Remove image"
          >
            ✕
          </button>
        </div>
      )}

      {/* Upload area */}
      <label style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.375rem',
        padding: '1.25rem',
        border: `2px dashed ${uploading ? '#9ca3af' : '#d1d5db'}`,
        borderRadius: '8px',
        background: uploading ? '#f9fafb' : '#fff',
        cursor: uploading ? 'not-allowed' : 'pointer',
        fontSize: '0.85rem',
        color: '#6b7280',
        transition: 'border-color 0.15s, background 0.15s',
      }}>
        {uploading ? (
          <>
            <span style={{ fontSize: '1.25rem' }}>⏳</span>
            Uploading…
          </>
        ) : (
          <>
            <span style={{ fontSize: '1.25rem' }}>📁</span>
            {url ? 'Replace image' : 'Click to upload an image'}
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          disabled={uploading}
          style={{ display: 'none' }}
        />
      </label>

      {error && (
        <p style={{ fontSize: '0.8rem', color: '#dc2626', margin: 0 }}>{error}</p>
      )}
    </div>
  )
}
