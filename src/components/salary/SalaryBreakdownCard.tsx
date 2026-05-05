import { useCalculatorStore } from '@/store/useCalculatorStore'
import { useSalaryCalculation } from '@/hooks/useSalaryCalculation'
import { formatINR } from '@/lib/utils/formatters'
import { BreakdownLineItem } from './BreakdownLineItem'
import { MonthlyYearlyToggle } from './MonthlyYearlyToggle'

export function SalaryBreakdownCard() {
  const { viewMode } = useCalculatorStore()
  const breakdown = useSalaryCalculation()

  const {
    basic,
    hra,
    specialAllowance,
    grossSalary,
    employeeEPF,
    finalAnnualTax,
    annualNetInhand,
    monthlyGross,
    monthlyEmployeeEPF,
    monthlyTax,
    monthlyNetInhand,
    hraExemption,
    rebate87A,
    surcharge,
  } = breakdown

  // Professional tax hardcoded at ₹200/month
  const professionalTaxMonthly = 200
  const professionalTaxAnnual = professionalTaxMonthly * 12

  // Helper to get amount based on view mode
  const getAmount = (annual: number, monthly: number) => 
    viewMode === 'YEARLY' ? annual : monthly

  // Helper to format with unit
  const formatWithUnit = (amount: number) => {
    const formatted = formatINR(amount)
    return `${formatted}${viewMode === 'YEARLY' ? '/year' : '/month'}`
  }

  return (
    <div className="bg-[var(--color-bg-card)] rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.07)] p-5 max-w-[480px] w-full">
      <h2 className="text-[18px] font-[700] leading-[1.3] text-[var(--color-text-primary)] mb-5">
        Salary Breakdown
      </h2>

      {/* Hero Number - In-hand Salary */}
      <div className="bg-[var(--color-bg-highlight)] rounded-[8px] border border-[var(--color-border)] p-4 mb-6">
        <p className="text-[14px] font-[400] leading-[1.5] text-[var(--color-text-secondary)] mb-2">
          Your In-hand Salary is
        </p>
        <p className="text-[28px] font-[700] leading-[1.2] text-[var(--color-positive)]">
          * {formatWithUnit(getAmount(annualNetInhand, monthlyNetInhand))}
        </p>
      </div>

      {/* Monthly/Yearly Toggle */}
      <MonthlyYearlyToggle />

      {/* Earnings Section */}
      <div className="mt-6 space-y-3">
        <BreakdownLineItem
          label="Basic Salary"
          amount={getAmount(basic, basic / 12)}
          dotColor="#2E86DE"
        />
        <BreakdownLineItem
          label="HRA"
          amount={getAmount(hra, hra / 12)}
          dotColor="var(--color-dot-hra)"
        />
        <BreakdownLineItem
          label="Special Allowance"
          amount={getAmount(specialAllowance, specialAllowance / 12)}
          dotColor="var(--color-dot-allowance)"
        />
      </div>

      {/* Gross Salary */}
      <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-[600] leading-[1.5] text-[var(--color-text-primary)]">
            Gross Salary ⓘ
          </span>
          <span className="text-[14px] font-[600] leading-[1.5] text-[var(--color-text-primary)]">
            {formatWithUnit(getAmount(grossSalary, monthlyGross))}
          </span>
        </div>
      </div>

      {/* Deductions Section */}
      <div className="mt-4 space-y-3">
        <BreakdownLineItem
          label="Employee PF Contribution"
          amount={getAmount(employeeEPF, monthlyEmployeeEPF)}
          isDeduction={true}
          dotColor="var(--color-dot-epf)"
        />
        <BreakdownLineItem
          label="Income Tax / TDS"
          amount={getAmount(finalAnnualTax, monthlyTax)}
          isDeduction={true}
          dotColor="var(--color-dot-tax)"
        />
        <BreakdownLineItem
          label="Professional Tax"
          amount={getAmount(professionalTaxAnnual, professionalTaxMonthly)}
          isDeduction={true}
          dotColor="var(--color-dot-tax)"
        />
      </div>

      {/* Total Deductions */}
      <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-[600] leading-[1.5] text-[var(--color-text-primary)]">
            Total Deductions
          </span>
          <span className="text-[14px] font-[600] leading-[1.5] text-[#E74C3C]">
            −{formatWithUnit(
              getAmount(
                employeeEPF + finalAnnualTax + professionalTaxAnnual,
                monthlyEmployeeEPF + monthlyTax + professionalTaxMonthly
              )
            )}
          </span>
        </div>
      </div>

      {/* Net In-hand Salary */}
      <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-[600] leading-[1.5] text-[var(--color-text-primary)]">
            Net In-hand Salary
          </span>
          <span className="text-[14px] font-[600] leading-[1.5] text-[#2ECC71]">
            {formatWithUnit(getAmount(annualNetInhand, monthlyNetInhand))}
          </span>
        </div>
      </div>

      {/* Section 87A Notice */}
      {rebate87A > 0 && finalAnnualTax === 0 && (
        <div className="mt-4 p-3 bg-[#D5F4E6] rounded-[4px]">
          <p className="text-[12px] font-[400] leading-[1.5] text-[#2ECC71]">
            ⓘ Your tax is ₹0 due to Section 87A rebate. This applies when taxable income is within specified limits.
          </p>
        </div>
      )}

      {/* HRA Exemption Notice */}
      {hraExemption > 0 && (
        <div className="mt-4 p-3 bg-[#D0DEFF] rounded-[4px]">
          <p className="text-[12px] font-[400] leading-[1.5] text-[#3B6FE8]">
            ⓘ HRA exemption of {formatINR(hraExemption)} applied under Old Regime.
          </p>
        </div>
      )}

      {/* Surcharge Notice */}
      {surcharge > 0 && (
        <div className="mt-4 p-3 bg-[#FEF5E7] rounded-[4px]">
          <p className="text-[12px] font-[400] leading-[1.5] text-[#F39C12]">
            ⓘ Surcharge applied. Marginal relief not calculated — actual tax may be slightly lower. Consult a CA.
          </p>
        </div>
      )}
    </div>
  )
}
