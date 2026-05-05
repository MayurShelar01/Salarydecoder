export interface TaxSlab {
  from: number
  to: number | null
  rate: number
}

export interface TaxResult {
  taxBeforeRebate: number
  rebate87A: number
  taxAfterRebate: number
  surcharge: number
  cess: number
  finalTax: number
}

