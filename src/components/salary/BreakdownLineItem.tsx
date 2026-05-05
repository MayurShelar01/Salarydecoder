import { formatINR } from '@/lib/utils/formatters'
import type { RecoveryTag } from '@/lib/types/recovery'
import { RecoveryLabel } from './RecoveryLabel'

interface BreakdownLineItemProps {
  label: string
  amount: number
  isDeduction?: boolean
  dotColor?: string
  /** Optional recovery classification tag. When provided, renders a ⓘ info icon with tooltip. */
  recoveryTag?: RecoveryTag
}

export function BreakdownLineItem({
  label,
  amount,
  isDeduction = false,
  dotColor = 'var(--color-dot-basic)',
  recoveryTag,
}: BreakdownLineItemProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 36 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Dot */}
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            flexShrink: 0,
            backgroundColor: dotColor,
          }}
        />
        {/* Label text */}
        <span style={{ fontSize: 14, fontWeight: 400, lineHeight: 1.5, color: 'var(--color-text-secondary)' }}>
          {label}
        </span>
        {/* ⓘ Recovery label icon — only rendered when tag is provided */}
        {recoveryTag && (
          <RecoveryLabel tag={recoveryTag} />
        )}
      </div>
      <span
        style={{
          fontSize: 14,
          fontWeight: 500,
          lineHeight: 1.5,
          flexShrink: 0,
          color: isDeduction ? 'var(--color-negative)' : 'var(--color-positive)',
        }}
      >
        {isDeduction && '−'}{formatINR(amount)}
      </span>
    </div>
  )
}
