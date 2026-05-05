interface NavigationProps {
  currentScreen: 'home' | 'breakdown'
  onNavigate: (screen: 'home' | 'breakdown') => void
}

export function Navigation({ currentScreen, onNavigate }: NavigationProps) {
  return (
    <div className="flex justify-center gap-4 mb-6">
      <button
        onClick={() => onNavigate('home')}
        className={`px-4 py-2 rounded-[999px] text-[14px] font-[500] h-9 transition-all duration-150 ease-in-out ${
          currentScreen === 'home'
            ? 'bg-[var(--color-action)] text-white'
            : 'bg-transparent text-[var(--color-text-primary)] hover:text-[var(--color-text-secondary)]'
        }`}
      >
        Calculator
      </button>
      <button
        onClick={() => onNavigate('breakdown')}
        className={`px-4 py-2 rounded-[999px] text-[14px] font-[500] h-9 transition-all duration-150 ease-in-out ${
          currentScreen === 'breakdown'
            ? 'bg-[var(--color-action)] text-white'
            : 'bg-transparent text-[var(--color-text-primary)] hover:text-[var(--color-text-secondary)]'
        }`}
      >
        Breakdown
      </button>
    </div>
  )
}
