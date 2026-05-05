import { useCalculatorStore } from '@/store/useCalculatorStore'
import { useSalaryCalculation } from '@/hooks/useSalaryCalculation'
import { Navigation } from '@/components/Navigation'
import { SalaryBreakdownCard } from '@/components/salary/SalaryBreakdownCard'
import { RegimeComparisonCard } from '@/components/salary/RegimeComparisonCard'

export function SalaryBreakdownScreen() {
  const { setViewMode } = useCalculatorStore()
  const breakdown = useSalaryCalculation()

  const handleBackToCalculator = () => {
    setViewMode('MONTHLY') // Reset to monthly view when going back
    // In a real app, this would navigate back to home
    // For now, we'll just reset the view mode
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-page)]">
      <div className="container mx-auto px-4 py-8 max-w-[1200px]">
        {/* Navigation */}
        <Navigation currentScreen="breakdown" onNavigate={(screen) => {
          if (screen === 'home') {
            handleBackToCalculator()
          }
        }} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Salary Breakdown Card */}
          <div className="flex justify-center">
            <SalaryBreakdownCard />
          </div>
          
          {/* Right Column - Regime Comparison */}
          <div className="flex justify-center">
            <RegimeComparisonCard />
          </div>
        </div>
      </div>
    </div>
  )
}
