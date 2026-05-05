import { useMemo } from 'react'
import { useCalculatorStore } from '@/store/useCalculatorStore'
import { calculateSalaryBreakdown } from '@/lib/calculations/salary'
import type { SalaryInputs, SalaryBreakdown } from '@/lib/types/salary'

export function useSalaryCalculation(): SalaryBreakdown {
  const {
    regime,
    ctc,
    variableComponent,
    basicPercent,
    cityType,
    monthlyRent,
    epfType,
    investments,
  } = useCalculatorStore()

  const inputs: SalaryInputs = {
    regime,
    ctc,
    variableComponent,
    basicPercent,
    cityType,
    monthlyRent,
    epfType,
    investments,
  }

  return useMemo(() => calculateSalaryBreakdown(inputs), [inputs])
}
