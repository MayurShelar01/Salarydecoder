import {  
  EPF_ANNUAL_FIXED,
  GRATUITY_CTC_RATE,
  STANDARD_DEDUCTION_NEW,
  STANDARD_DEDUCTION_OLD,
  INVESTMENT_80C_CAP,
  HRA_METRO_RATE,
  HRA_NON_METRO_RATE
} from '@/lib/config/constants'
import { calculateTaxResult } from './tax'
import { calculateHRAExemption } from './hra'
import type { SalaryInputs, SalaryBreakdown } from '@/lib/types/salary'

export function calculateSalaryBreakdown(
  inputs: SalaryInputs
): SalaryBreakdown {
  const { regime, ctc, variableComponent, basicPercent, cityType, monthlyRent, epfType, investments } = inputs

  // Basic salary is calculated on full CTC, not effective CTC
  const basic = ctc * (basicPercent / 100)

  // HRA calculation
  const hraRate = cityType === 'METRO' ? HRA_METRO_RATE : HRA_NON_METRO_RATE
  const hra = basic * hraRate

  // Employer contributions
  const employerEPF = EPF_ANNUAL_FIXED
  const gratuityCost = basic * GRATUITY_CTC_RATE

  // Gross salary after removing employer contributions and variable component
  const grossSalary = ctc - employerEPF - gratuityCost - variableComponent

  // Special allowance is the remaining amount
  const specialAllowance = grossSalary - basic - hra

  // Employee EPF
  const employeeEPF = epfType === 'FIXED_1800' ? EPF_ANNUAL_FIXED : basic * 0.12

  // HRA exemption (only for old regime and when rent is paid)
  const hraExemption = regime === 'OLD' && monthlyRent > 0 
    ? calculateHRAExemption(basic, monthlyRent * 12, cityType) 
    : 0

  // Taxable income calculation
  let taxableIncome: number
  if (regime === 'NEW') {
    taxableIncome = grossSalary - STANDARD_DEDUCTION_NEW
  } else {
    const deductibleInvestments = Math.min(investments, INVESTMENT_80C_CAP)
    taxableIncome = grossSalary - STANDARD_DEDUCTION_OLD - employeeEPF - hraExemption - deductibleInvestments
  }

  // Tax calculations
  const taxResult = calculateTaxResult(taxableIncome, regime)
  const finalAnnualTax = taxResult.finalTax

  // Net calculations
  const annualNetInhand = grossSalary - employeeEPF - finalAnnualTax

  // Monthly calculations
  const monthlyGross = grossSalary / 12
  const monthlyEmployeeEPF = employeeEPF / 12
  const monthlyTax = finalAnnualTax / 12
  const monthlyNetInhand = annualNetInhand / 12

  return {
    basic,
    hra,
    employerEPF,
    gratuityCost,
    variableComponent,
    grossSalary,
    specialAllowance,
    employeeEPF,
    hraExemption,
    taxableIncome,
    taxBeforeRebate: taxResult.taxBeforeRebate,
    rebate87A: taxResult.rebate87A,
    taxAfterRebate: taxResult.taxAfterRebate,
    surcharge: taxResult.surcharge,
    cess: taxResult.cess,
    finalAnnualTax,
    annualNetInhand,
    monthlyGross,
    monthlyEmployeeEPF,
    monthlyTax,
    monthlyNetInhand
  }
}
