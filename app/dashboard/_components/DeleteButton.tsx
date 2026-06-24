'use client'

import Swal from 'sweetalert2'

export function DeleteButton({
  action,
  confirmText,
}: {
  action: () => Promise<void>
  confirmText: string
}) {
  async function handleClick() {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: confirmText,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel',
    })

    if (result.isConfirmed) {
      await action()
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{
        padding: '0.375rem 0.75rem',
        background: '#fee2e2',
        border: 'none',
        borderRadius: '6px',
        fontSize: '0.8rem',
        fontWeight: 600,
        color: '#dc2626',
        cursor: 'pointer',
      }}
    >
      Delete
    </button>
  )
}
