import { describe, expect, it } from 'vitest'

// Module 2 will implement these. For now, these imports are intended to fail.
import { calculateTax } from '@/lib/calculations/tax'

describe('tax calculations (spec for Module 2)', () => {
  it('New regime, taxable ₹12,00,000 → tax = 0 (87A applies)', () => {
    const result = calculateTax({ regime: 'NEW', taxableIncome: 1200000 })
    expect(result.finalTax).toBe(0)
  })

  it('New regime, taxable ₹12,00,001 → tax > 0', () => {
    const result = calculateTax({ regime: 'NEW', taxableIncome: 1200001 })
    expect(result.finalTax).toBeGreaterThan(0)
  })

  it('Old regime, taxable ₹5,00,000 → tax = 0 (87A applies)', () => {
    const result = calculateTax({ regime: 'OLD', taxableIncome: 500000 })
    expect(result.finalTax).toBe(0)
  })

  it('Old regime, taxable ₹5,00,001 → tax > 0', () => {
    const result = calculateTax({ regime: 'OLD', taxableIncome: 500001 })
    expect(result.finalTax).toBeGreaterThan(0)
  })

  it('New regime, taxable ₹15,00,000 → calculated tax matches slab logic', () => {
    const result = calculateTax({ regime: 'NEW', taxableIncome: 1500000 })
    // Expected slab tax (before cess/surcharge for this income range):
    // 4L–8L @5% => 20,000
    // 8L–12L @10% => 40,000
    // 12L–15L @15% => 45,000
    // Total => 1,05,000 (then cess 4% => 4,200) => 1,09,200
    expect(result.finalTax).toBe(109200)
  })
})

