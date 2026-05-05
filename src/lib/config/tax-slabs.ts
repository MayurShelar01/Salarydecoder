import type { TaxSlab } from '@/lib/types'

export const NEW_REGIME_SLABS_FY_2025_26: TaxSlab[] = [
  { from: 0, to: 400000, rate: 0 },
  { from: 400001, to: 800000, rate: 0.05 },
  { from: 800001, to: 1200000, rate: 0.1 },
  { from: 1200001, to: 1600000, rate: 0.15 },
  { from: 1600001, to: 2000000, rate: 0.2 },
  { from: 2000001, to: 2400000, rate: 0.25 },
  { from: 2400001, to: null, rate: 0.3 },
]

export const OLD_REGIME_SLABS_FY_2025_26: TaxSlab[] = [
  { from: 0, to: 250000, rate: 0 },
  { from: 250001, to: 500000, rate: 0.05 },
  { from: 500001, to: 1000000, rate: 0.2 },
  { from: 1000001, to: null, rate: 0.3 },
]

export const REBATE_87A = {
  NEW: {
    threshold: 1200000,
  },
  OLD: {
    threshold: 500000,
    maxRebate: 12500,
  },
} as const

export const SURCHARGE_SLABS = {
  from50LTo1Cr: { from: 50_00_000, to: 1_00_00_000, rate: 0.1 },
  from1CrTo2Cr: { from: 1_00_00_000, to: 2_00_00_000, rate: 0.15 },
  from2CrTo5Cr: { from: 2_00_00_000, to: 5_00_00_000, rate: 0.25 },
  above5Cr: {
    from: 5_00_00_001,
    to: null,
    rate: {
      OLD: 0.37,
      NEW: 0.25,
    },
  },
} as const

