import { describe, expect, it } from 'vitest'

// Module 2 will implement these. For now, these imports are intended to fail.
import { calculateSalaryBreakdown } from '@/lib/calculations/salary'

describe('salary calculations (spec for Module 2)', () => {
  it('CTC ₹6L, New regime, defaults → monthly net in-hand ≈ ₹45,198 (±₹500)', () => {
    const result = calculateSalaryBreakdown({
      regime: 'NEW',
      ctc: 600000,
      variableComponent: 0,
      basicPercent: 50,
      cityType: 'METRO',
      monthlyRent: 0,
      epfType: 'FIXED_1800',
      investments: 0,
    })

    expect(result.monthlyNetInhand).toBeGreaterThanOrEqual(45198 - 500)
    expect(result.monthlyNetInhand).toBeLessThanOrEqual(45198 + 500)
  })

  it('CTC ₹6L, Old regime, defaults → monthly net in-hand ≈ ₹45,198 (±₹500), tax = ₹0', () => {
    const result = calculateSalaryBreakdown({
      regime: 'OLD',
      ctc: 600000,
      variableComponent: 0,
      basicPercent: 50,
      cityType: 'METRO',
      monthlyRent: 0,
      epfType: 'FIXED_1800',
      investments: 0,
    })

    expect(result.monthlyNetInhand).toBeGreaterThanOrEqual(45198 - 500)
    expect(result.monthlyNetInhand).toBeLessThanOrEqual(45198 + 500)
    expect(result.finalAnnualTax).toBe(0)
  })

  it('CTC ₹13.5L, New regime → monthly net in-hand ≈ ₹1,00,722 (±₹500)', () => {
    const result = calculateSalaryBreakdown({
      regime: 'NEW',
      ctc: 1350000,
      variableComponent: 0,
      basicPercent: 50,
      cityType: 'METRO',
      monthlyRent: 0,
      epfType: 'FIXED_1800',
      investments: 0,
    })

    expect(result.monthlyNetInhand).toBeGreaterThanOrEqual(100722 - 500)
    expect(result.monthlyNetInhand).toBeLessThanOrEqual(100722 + 500)
  })

  it('CTC ₹22L, New regime → monthly net in-hand ≈ ₹1,56,897 (±₹500)', () => {
    const result = calculateSalaryBreakdown({
      regime: 'NEW',
      ctc: 2200000,
      variableComponent: 0,
      basicPercent: 50,
      cityType: 'METRO',
      monthlyRent: 0,
      epfType: 'FIXED_1800',
      investments: 0,
    })

    expect(result.monthlyNetInhand).toBeGreaterThanOrEqual(156897 - 500)
    expect(result.monthlyNetInhand).toBeLessThanOrEqual(156897 + 500)
  })

  it('CTC ₹15L, Variable ₹2L, New → Basic = ₹7,50,000 (50% of FULL CTC, NOT effective CTC)', () => {
    const result = calculateSalaryBreakdown({
      regime: 'NEW',
      ctc: 1500000,
      variableComponent: 200000,
      basicPercent: 50,
      cityType: 'METRO',
      monthlyRent: 0,
      epfType: 'FIXED_1800',
      investments: 0,
    })

    expect(result.basic).toBe(750000)
  })
})

