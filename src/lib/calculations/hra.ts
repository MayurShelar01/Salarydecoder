import { HRA_METRO_RATE, HRA_NON_METRO_RATE } from '@/lib/config/constants'
import type { CityType } from '@/lib/types/salary'

export function calculateHRAExemption(
  basicAnnual: number,
  rentAnnual: number,
  cityType: CityType
): number {
  const hraRate = cityType === 'METRO' ? HRA_METRO_RATE : HRA_NON_METRO_RATE
  
  // Actual HRA received
  const actualHRA = basicAnnual * hraRate
  
  // Rent paid minus 10% of basic salary
  const rentMinus10PercentBasic = Math.max(0, rentAnnual - basicAnnual * 0.10)
  
  // Maximum HRA exemption based on city type
  const maxHRA = basicAnnual * hraRate
  
  // HRA exemption is the minimum of the three conditions
  return Math.min(actualHRA, rentMinus10PercentBasic, maxHRA)
}
