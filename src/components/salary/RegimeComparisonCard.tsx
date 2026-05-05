import { useMemo } from 'react'
import { useCalculatorStore } from '@/store/useCalculatorStore'
import { calculateSalaryBreakdown } from '@/lib/calculations/salary'
import { formatINR } from '@/lib/utils/formatters'

export function RegimeComparisonCard() {
  const { ctc, variableComponent, basicPercent, cityType, monthlyRent, epfType, investments } = useCalculatorStore()

  const comparison = useMemo(() => {
    // Calculate for both regimes
    const oldRegimeInputs = {
      regime: 'OLD' as const,
      ctc,
      variableComponent,
      basicPercent,
      cityType,
      monthlyRent,
      epfType,
      investments,
    }

    const newRegimeInputs = {
      ...oldRegimeInputs,
      regime: 'NEW' as const,
    }

    const oldBreakdown = calculateSalaryBreakdown(oldRegimeInputs)
    const newBreakdown = calculateSalaryBreakdown(newRegimeInputs)

    const difference = newBreakdown.annualNetInhand - oldBreakdown.annualNetInhand

    return {
      oldRegime: oldBreakdown.annualNetInhand,
      newRegime: newBreakdown.annualNetInhand,
      difference,
      betterRegime: difference > 0 ? 'NEW' : difference < 0 ? 'OLD' : 'EQUAL',
    }
  }, [ctc, variableComponent, basicPercent, cityType, monthlyRent, epfType, investments])

  const { oldRegime, newRegime, difference, betterRegime } = comparison

  const getRecommendationText = () => {
    if (Math.abs(difference) <= 5000) {
      return 'Both regimes are nearly equal'
    }
    
    if (betterRegime === 'NEW') {
      return `New regime saves you ${formatINR(Math.abs(difference))}/year`
    }
    
    if (betterRegime === 'OLD') {
      return `Old regime saves you ${formatINR(Math.abs(difference))}/year`
    }
    
    return 'Both regimes are equal'
  }

  const getRecommendationColor = () => {
    if (Math.abs(difference) <= 5000) {
      return 'text-[var(--color-text-secondary)]'
    }
    return betterRegime === 'NEW' ? 'text-[#2ECC71]' : 'text-[#3B6FE8]'
  }

  return (
    <div className="bg-[var(--color-bg-card)] rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.07)] p-5 max-w-[480px] w-full">
      <h2 className="text-[18px] font-[700] leading-[1.3] text-[var(--color-text-primary)] mb-5">
        Regime Comparison
      </h2>

      <div className="space-y-4">
        {/* Old Regime */}
        <div className="flex justify-between items-center p-3 bg-[var(--color-bg-card)] rounded-[8px]">
          <div>
            <h3 className="text-[14px] font-[600] leading-[1.5] text-[var(--color-text-primary)]">
              Old Regime
            </h3>
            <p className="text-[12px] font-[400] leading-[1.5] text-[var(--color-text-secondary)]">
              With deductions & exemptions
            </p>
          </div>
          <div className="text-right">
            <p className="text-[16px] font-[600] leading-[1.4] text-[var(--color-text-primary)]">
              {formatINR(oldRegime)}/year
            </p>
            <p className="text-[12px] font-[400] leading-[1.5] text-[var(--color-text-secondary)]">
              {formatINR(Math.round(oldRegime / 12))}/month
            </p>
          </div>
        </div>

        {/* New Regime */}
        <div className="flex justify-between items-center p-3 bg-[var(--color-bg-card)] rounded-[8px]">
          <div>
            <h3 className="text-[14px] font-[600] leading-[1.5] text-[var(--color-text-primary)]">
              New Regime
            </h3>
            <p className="text-[12px] font-[400] leading-[1.5] text-[var(--color-text-secondary)]">
              Lower tax rates, no deductions
            </p>
          </div>
          <div className="text-right">
            <p className="text-[16px] font-[600] leading-[1.4] text-[var(--color-text-primary)]">
              {formatINR(newRegime)}/year
            </p>
            <p className="text-[12px] font-[400] leading-[1.5] text-[var(--color-text-secondary)]">
              {formatINR(Math.round(newRegime / 12))}/month
            </p>
          </div>
        </div>

        {/* Recommendation */}
        <div className="mt-4 p-4 bg-[var(--color-bg-card)] rounded-[8px] border border-[var(--color-border)]">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[16px]">💡</span>
            <h3 className="text-[14px] font-[600] leading-[1.5] text-[var(--color-text-primary)]">
              Recommendation
            </h3>
          </div>
          <p className={`text-[14px] font-[500] leading-[1.5] ${getRecommendationColor()}`}>
            {getRecommendationText()}
          </p>
        </div>

        {/* Note about variables */}
        <div className="mt-4 p-3 bg-[#FEF5E7] rounded-[4px]">
          <p className="text-[12px] font-[400] leading-[1.5] text-[#F39C12]">
            ⓘ This comparison is based on your current inputs. Actual tax calculation may vary based on specific deductions, exemptions, and other factors.
          </p>
        </div>
      </div>
    </div>
  )
}
