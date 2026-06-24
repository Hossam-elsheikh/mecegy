'use client'

import { useActionState } from 'react'
import { login } from '../_actions/auth'

export default function LoginPage() {
  const [error, action, pending] = useActionState(login, null)

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f9fafb',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#163029' }}>MEC Admin</h1>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', marginTop: '0.25rem' }}>Sign in to manage content</p>
        </div>

        <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {error && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              color: '#dc2626',
              fontSize: '0.875rem',
            }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <label htmlFor="email" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              style={{
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '0.625rem 0.875rem',
                fontSize: '0.9rem',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <label htmlFor="password" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              style={{
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '0.625rem 0.875rem',
                fontSize: '0.9rem',
                outline: 'none',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            style={{
              marginTop: '0.5rem',
              background: pending ? '#9ca3af' : '#E9501C',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: pending ? 'not-allowed' : 'pointer',
            }}
          >
            {pending ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
