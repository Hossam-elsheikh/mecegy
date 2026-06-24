export function FormField({
  label,
  name,
  defaultValue = '',
  required = false,
  type = 'text',
}: {
  label: string
  name: string
  defaultValue?: string
  required?: boolean
  type?: string
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
      <label htmlFor={name} style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151' }}>
        {label}{required && <span style={{ color: '#E9501C' }}> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        style={{
          width: '100%',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          padding: '0.5rem 0.75rem',
          fontSize: '0.875rem',
          background: '#fff',
          outline: 'none',
          boxSizing: 'border-box',
        }}
      />
    </div>
  )
}

export function TextareaField({
  label,
  name,
  defaultValue = '',
  rows = 4,
  hint,
}: {
  label: string
  name: string
  defaultValue?: string
  rows?: number
  hint?: string
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
      <label htmlFor={name} style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151' }}>
        {label}
      </label>
      {hint && <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{hint}</span>}
      <textarea
        id={name}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        style={{
          width: '100%',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          padding: '0.5rem 0.75rem',
          fontSize: '0.875rem',
          background: '#fff',
          outline: 'none',
          resize: 'vertical',
          fontFamily: 'inherit',
          lineHeight: 1.6,
          boxSizing: 'border-box',
        }}
      />
    </div>
  )
}

export function SectionDivider({ title }: { title: string }) {
  return (
    <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '1.5rem', marginTop: '1rem' }}>
      <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#163029', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {title}
      </h3>
    </div>
  )
}

/** Responsive two-column grid that collapses to one on small screens */
export function FieldRow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
      {children}
    </div>
  )
}
