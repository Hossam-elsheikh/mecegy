'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '../_actions/auth'

const navItems = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/projects', label: 'Projects' },
  { href: '/dashboard/news', label: 'News' },
]

export function DashboardShell({
  children,
  email,
}: {
  children: React.ReactNode
  email: string
}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close sidebar on route change (mobile nav)
  useEffect(() => { setOpen(false) }, [pathname])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <style>{`
        .dash-layout { display: flex; min-height: 100vh; font-family: system-ui, sans-serif; }

        /* Sidebar */
        .dash-sidebar {
          width: 220px;
          flex-shrink: 0;
          background: #163029;
          color: #fff;
          display: flex;
          flex-direction: column;
          padding: 1.5rem 0;
          z-index: 40;
          transition: transform 0.25s ease;
        }

        /* Main */
        .dash-main {
          flex: 1;
          padding: 2rem 2.5rem;
          background: #f9fafb;
          overflow-y: auto;
          min-width: 0;
        }

        /* Topbar (mobile only) */
        .dash-topbar {
          display: none;
          align-items: center;
          gap: 1rem;
          padding: 0.875rem 1.25rem;
          background: #163029;
          color: #fff;
        }

        /* Backdrop */
        .dash-backdrop {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.45);
          z-index: 30;
        }

        @media (max-width: 767px) {
          .dash-layout { flex-direction: column; }

          .dash-topbar { display: flex; }

          .dash-sidebar {
            position: fixed;
            top: 0; left: 0; bottom: 0;
            transform: translateX(-100%);
          }
          .dash-sidebar.is-open {
            transform: translateX(0);
            box-shadow: 4px 0 24px rgba(0,0,0,0.25);
          }

          .dash-backdrop.is-open { display: block; }

          .dash-main { padding: 1.25rem 1rem; }
        }
      `}</style>

      <div className="dash-layout">
        {/* Mobile topbar */}
        <header className="dash-topbar">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              padding: '0.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
            }}
          >
            <span style={{ display: 'block', width: '22px', height: '2px', background: '#fff', borderRadius: '2px' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: '#fff', borderRadius: '2px' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: '#fff', borderRadius: '2px' }} />
          </button>
          <span style={{ fontWeight: 800, fontSize: '1rem', color: '#F28B2D' }}>MEC Admin</span>
        </header>

        {/* Backdrop */}
        <div
          className={`dash-backdrop${open ? ' is-open' : ''}`}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />

        {/* Sidebar */}
        <aside className={`dash-sidebar${open ? ' is-open' : ''}`}>
          <div style={{ padding: '0 1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#F28B2D' }}>MEC Admin</span>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.25rem', wordBreak: 'break-all' }}>
                {email}
              </p>
            </div>
            {/* Close button (mobile) */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.6)',
                cursor: 'pointer',
                fontSize: '1.25rem',
                lineHeight: 1,
                padding: '0.125rem',
              }}
            >
              ✕
            </button>
          </div>

          <nav style={{ flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  display: 'block',
                  padding: '0.625rem 0.75rem',
                  borderRadius: '8px',
                  color: pathname === href ? '#fff' : 'rgba(255,255,255,0.7)',
                  background: pathname === href ? 'rgba(255,255,255,0.12)' : 'transparent',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: pathname === href ? 700 : 500,
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div style={{ padding: '0 0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
            <form action={logout}>
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '0.625rem 0.75rem',
                  background: 'rgba(255,255,255,0.08)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                Sign out
              </button>
            </form>
          </div>
        </aside>

        {/* Main content */}
        <main className="dash-main">
          {children}
        </main>
      </div>
    </>
  )
}
