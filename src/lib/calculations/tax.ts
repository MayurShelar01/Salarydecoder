import { NEW_REGIME_SLABS_FY_2025_26, OLD_REGIME_SLABS_FY_2025_26, REBATE_87A, SURCHARGE_SLABS } from '@/lib/config/tax-slabs'
import { CESS_RATE } from '@/lib/config/constants'
import type { TaxResult } from '@/lib/types/tax'

export function calculateTaxResult(
  taxableIncome: number,
  regime: 'OLD' | 'NEW'
): TaxResult {
  const slabs = regime === 'NEW' ? NEW_REGIME_SLABS_FY_2025_26 : OLD_REGIME_SLABS_FY_2025_26
  
  // Calculate tax before rebate
  let taxBeforeRebate = 0
  for (const slab of slabs) {
    if (taxableIncome > slab.from) {
      const taxableInSlab = slab.to === null 
        ? taxableIncome - slab.from 
        : Math.min(taxableIncome - slab.from, slab.to - slab.from)
      taxBeforeRebate += taxableInSlab * slab.rate
    }
  }

  // Calculate rebate under 87A
  let rebate87A = 0
  if (regime === 'NEW' && taxableIncome <= REBATE_87A.NEW.threshold) {
    rebate87A = taxBeforeRebate
  } else if (regime === 'OLD' && taxableIncome <= REBATE_87A.OLD.threshold) {
    rebate87A = Math.min(taxBeforeRebate, REBATE_87A.OLD.maxRebate)
  }

  const taxAfterRebate = taxBeforeRebate - rebate87A

  // Calculate surcharge
  let surchargeRate = 0
  if (taxableIncome >= SURCHARGE_SLABS.above5Cr.from) {
    surchargeRate = regime === 'NEW' ? SURCHARGE_SLABS.above5Cr.rate.NEW : SURCHARGE_SLABS.above5Cr.rate.OLD
  } else if (taxableIncome >= SURCHARGE_SLABS.from2CrTo5Cr.from) {
    surchargeRate = SURCHARGE_SLABS.from2CrTo5Cr.rate
  } else if (taxableIncome >= SURCHARGE_SLABS.from1CrTo2Cr.from) {
    surchargeRate = SURCHARGE_SLABS.from1CrTo2Cr.rate
  } else if (taxableIncome >= SURCHARGE_SLABS.from50LTo1Cr.from) {
    surchargeRate = SURCHARGE_SLABS.from50LTo1Cr.rate
  }

  const surcharge = taxAfterRebate * surchargeRate
  const cess = (taxAfterRebate + surcharge) * CESS_RATE
  const finalTax = Math.round(taxAfterRebate + surcharge + cess)

  return {
    taxBeforeRebate,
    rebate87A,
    taxAfterRebate,
    surcharge,
    cess,
    finalTax
  }
}

// Export function name expected by tests
export function calculateTax(params: { regime: 'OLD' | 'NEW'; taxableIncome: number }): TaxResult {
  return calculateTaxResult(params.taxableIncome, params.regime)
}
