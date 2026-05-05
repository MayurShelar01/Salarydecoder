import { useCalculatorStore } from '@/store/useCalculatorStore'
import { useSalaryCalculation } from '@/hooks/useSalaryCalculation'
import { calculatePFCorpus } from '@/lib/calculations/pf'

export function usePFCalculation() {
  const pfYears = useCalculatorStore((s) => s.pfYears);
  const breakdown = useSalaryCalculation();  
  
  if (!breakdown) return null;

  const monthlyBasic = breakdown.basic / 12;
  return calculatePFCorpus({ monthlyBasic, years: pfYears });
}
