import { useCalculatorStore } from '@/store/useCalculatorStore'
import type { ViewMode } from '@/lib/types/salary'

export function MonthlyYearlyToggle() {
  const { viewMode, setViewMode } = useCalculatorStore()

  return (
    <div className="inline-flex border-[1.5px] border-[var(--color-border)] rounded-[999px] p-[3px]">
      <button
        onClick={() => setViewMode('MONTHLY')}
        className={`px-3 py-1 rounded-[999px] text-[12px] font-[600] h-8 transition-all duration-150 ease-in-out ${
          viewMode === 'MONTHLY'
            ? 'bg-[var(--color-action)] text-white'
            : 'bg-transparent text-[var(--color-text-primary)] hover:text-[var(--color-text-secondary)]'
        }`}
      >
        Monthly
      </button>
      <button
        onClick={() => setViewMode('YEARLY')}
        className={`px-3 py-1 rounded-[999px] text-[12px] font-[600] h-8 transition-all duration-150 ease-in-out ${
          viewMode === 'YEARLY'
            ? 'bg-[var(--color-action)] text-white'
            : 'bg-transparent text-[var(--color-text-primary)] hover:text-[var(--color-text-secondary)]'
        }`}
      >
        Yearly
      </button>
    </div>
  )
}
