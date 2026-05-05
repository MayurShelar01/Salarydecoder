export type TaxRegime = 'OLD' | 'NEW'
export type CityType = 'METRO' | 'NON_METRO'
export type EPFType = 'FIXED_1800' | 'TWELVE_PERCENT_BASIC'
export type ViewMode = 'MONTHLY' | 'YEARLY'

export interface SalaryInputs {
  regime: TaxRegime
  ctc: number
  variableComponent: number
  basicPercent: number
  cityType: CityType
  monthlyRent: number
  epfType: EPFType
  investments: number
}

export interface SalaryBreakdown {
  basic: number
  hra: number
  employerEPF: number
  gratuityCost: number
  variableComponent: number
  grossSalary: number
  specialAllowance: number
  employeeEPF: number
  hraExemption: number
  taxableIncome: number
  taxBeforeRebate: number
  rebate87A: number
  taxAfterRebate: number
  surcharge: number
  cess: number
  finalAnnualTax: number
  annualNetInhand: number
  monthlyGross: number
  monthlyEmployeeEPF: number
  monthlyTax: number
  monthlyNetInhand: number
}

