import { formatINR } from '@/lib/utils/formatters'

interface BreakdownLineItemProps {
  label: string
  amount: number
  isDeduction?: boolean
  dotColor?: string
  recoveryTag?: string // Placeholder for Module 5
}

export function BreakdownLineItem({ 
  label, 
  amount, 
  isDeduction = false, 
  dotColor = 'var(--color-dot-basic)',
  recoveryTag 
}: BreakdownLineItemProps) {
  return (
    <div className="flex items-center gap-3 justify-between h-9">
      <div className="flex items-center gap-3">
        <div 
          className="w-2 h-2 rounded-full" 
          style={{ backgroundColor: dotColor }}
        />
        <span className="text-[14px] font-[400] leading-[1.5] text-[var(--color-text-secondary)]">
          {label}
        </span>
      </div>
      <span 
        className={`text-[14px] font-[500] leading-[1.5] ${
          isDeduction ? 'text-[var(--color-negative)]' : 'text-[var(--color-positive)]'
        }`}
      >
        {isDeduction && '−'}{formatINR(amount)}
      </span>
    </div>
  )
}
