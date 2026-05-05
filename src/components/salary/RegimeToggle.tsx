import { useCalculatorStore } from '@/store/useCalculatorStore'

export function RegimeToggle() {
  const { regime, setRegime } = useCalculatorStore()

  return (
    <div className="inline-flex border-[1.5px] border-[var(--color-border)] rounded-[999px] p-[3px]">
      <button
        onClick={() => setRegime('OLD')}
        className={`px-4 py-2 rounded-[999px] text-[14px] font-[500] h-9 transition-all duration-150 ease-in-out ${
          regime === 'OLD'
            ? 'bg-[var(--color-action)] text-white'
            : 'bg-transparent text-[var(--color-text-primary)] hover:text-[var(--color-text-secondary)]'
        }`}
      >
        Old regime
      </button>
      <button
        onClick={() => setRegime('NEW')}
        className={`px-4 py-2 rounded-[999px] text-[14px] font-[500] h-9 transition-all duration-150 ease-in-out ${
          regime === 'NEW'
            ? 'bg-[var(--color-action)] text-white'
            : 'bg-transparent text-[var(--color-text-primary)] hover:text-[var(--color-text-secondary)]'
        }`}
      >
        New regime
      </button>
    </div>
  )
}
