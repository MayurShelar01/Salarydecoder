import { useState, useRef, useEffect, useCallback } from 'react'
import type { RecoveryTag } from '@/lib/types/recovery'
import { RECOVERY_LABEL_CONFIG } from '@/lib/config/recovery-labels'

interface RecoveryLabelProps {
  tag: RecoveryTag
}

/**
 * RecoveryLabel
 * Renders a small ⓘ info icon. On hover (desktop) or tap (mobile), shows a
 * tooltip explaining the recovery classification of the salary component.
 * Fully keyboard-accessible and screen-reader friendly.
 */
export function RecoveryLabel({ tag }: RecoveryLabelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLSpanElement>(null)
  const config = RECOVERY_LABEL_CONFIG[tag]

  // Close on outside click/tap
  const handleOutsideClick = useCallback((e: MouseEvent | TouchEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setIsOpen(false)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
      document.addEventListener('touchstart', handleOutsideClick)
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick)
    }
  }, [isOpen, handleOutsideClick])

  // Close on Escape key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setIsOpen(false)
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsOpen((prev) => !prev)
    }
  }

  return (
    <span
      ref={containerRef}
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
    >
      {/* ⓘ trigger icon */}
      <span
        role="button"
        tabIndex={0}
        aria-label={`Info: ${config.title}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 14,
          height: 14,
          borderRadius: '50%',
          border: '1px solid var(--color-text-muted)',
          color: 'var(--color-text-muted)',
          fontSize: 9,
          fontWeight: 500,
          lineHeight: 1,
          cursor: 'pointer',
          userSelect: 'none',
          flexShrink: 0,
          transition: 'border-color 0.15s ease, color 0.15s ease',
        }}
      >
        i
      </span>

      {/* Tooltip / Popover */}
      {isOpen && (
        <span
          role="tooltip"
          aria-live="polite"
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#1A1A1A',
            color: '#FFFFFF',
            borderRadius: 8,
            padding: '10px 12px',
            width: 220,
            maxWidth: 'calc(100vw - 32px)',
            zIndex: 50,
            boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
            pointerEvents: 'none',
          }}
        >
          {/* Arrow */}
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid #1A1A1A',
            }}
          />

          {/* Title */}
          <span
            style={{
              display: 'block',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 0.4,
              textTransform: 'uppercase',
              color: '#999999',
              marginBottom: 4,
            }}
          >
            {config.title}
          </span>

          {/* Body copy */}
          <span
            style={{
              display: 'block',
              fontSize: 12,
              fontWeight: 400,
              lineHeight: 1.55,
              color: '#FFFFFF',
            }}
          >
            {config.copy}
          </span>
        </span>
      )}
    </span>
  )
}
