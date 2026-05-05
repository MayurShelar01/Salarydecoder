import { useState, useEffect } from 'react'
import { useCalculatorStore } from '@/store/useCalculatorStore'
import { formatINR } from '@/lib/utils/formatters'
import { MIN_CTC, MAX_CTC, MIN_BASIC_PERCENT, MAX_BASIC_PERCENT } from '@/lib/config/constants'
import type { CityType, EPFType } from '@/lib/types/salary'

export function SalaryInputForm() {
  const {
    regime,
    ctc,
    variableComponent,
    basicPercent,
    cityType,
    monthlyRent,
    epfType,
    investments,
    setCtc,
    setVariableComponent,
    setBasicPercent,
    setCityType,
    setMonthlyRent,
    setEpfType,
    setInvestments,
  } = useCalculatorStore()

  const [ctcError, setCtcError] = useState('')
  const [variableError, setVariableError] = useState('')
  const [basicWarning, setBasicWarning] = useState('')

  // Validation effects
  useEffect(() => {
    if (ctc < MIN_CTC) {
      setCtcError(`Minimum CTC is ${formatINR(MIN_CTC)}`)
    } else if (ctc > MAX_CTC) {
      setCtcError('Please contact a CA for CTC above ₹10Cr')
    } else {
      setCtcError('')
    }
  }, [ctc])

  useEffect(() => {
    if (variableComponent > ctc) {
      setVariableError('Variable pay cannot exceed total CTC')
    } else {
      setVariableError('')
    }
  }, [variableComponent, ctc])

  useEffect(() => {
    if (basicPercent < MIN_BASIC_PERCENT) {
      setBasicWarning('')
    } else if (basicPercent > MAX_BASIC_PERCENT) {
      setBasicWarning('')
    } else {
      setBasicWarning('')
    }
  }, [basicPercent])

  const basicAnnual = ctc * (basicPercent / 100)

  return (
    <div className="bg-white rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.07)] p-5 max-w-[480px] w-full">
      <h2 className="text-[18px] font-[700] leading-[1.3] text-[#1A1A1A] mb-5">
        Salary Calculator
      </h2>

      {/* CTC Input */}
      <div className="mb-6">
        <label className="block text-[14px] font-[400] leading-[1.5] text-[#666666] mb-2">
          Cost to Company (CTC)
        </label>
        <div className="relative">
          <input
            type="text"
            value={formatINR(ctc)}
            onChange={(e) => {
              const value = e.target.value.replace(/[₹,]/g, '')
              const num = parseFloat(value) || 0
              if (!isNaN(num)) setCtc(num)
            }}
            className={`w-full text-[16px] font-[600] leading-[1.4] bg-transparent border-b-2 outline-none transition-colors ${
              ctcError ? 'border-[var(--color-error)]' : 'border-[var(--color-border)] focus:border-[var(--color-accent)]'
            }`}
            placeholder="₹ 0"
          />
        </div>
        {ctcError && (
          <div className="flex items-center gap-1 mt-2">
            <span className="text-[12px] text-[#E74C3C]">ⓘ</span>
            <span className="text-[12px] text-[#E74C3C]">{ctcError}</span>
          </div>
        )}
      </div>

      {/* Variable Component */}
      <div className="mb-6">
        <label className="block text-[14px] font-[400] leading-[1.5] text-[#666666] mb-2">
          Variable Component
        </label>
        <div className="relative">
          <input
            type="text"
            value={formatINR(variableComponent)}
            onChange={(e) => {
              const value = e.target.value.replace(/[₹,]/g, '')
              const num = parseFloat(value) || 0
              if (!isNaN(num)) setVariableComponent(num)
            }}
            className={`w-full text-[16px] font-[600] leading-[1.4] bg-transparent border-b-2 outline-none transition-colors ${
              variableError ? 'border-[var(--color-error)]' : 'border-[var(--color-border)] focus:border-[var(--color-accent)]'
            }`}
            placeholder="₹ 0"
          />
        </div>
        {variableError && (
          <div className="flex items-center gap-1 mt-2">
            <span className="text-[12px] text-[#E74C3C]">ⓘ</span>
            <span className="text-[12px] text-[#E74C3C]">{variableError}</span>
          </div>
        )}
      </div>

      {/* Basic Salary % Slider */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-[14px] font-[400] leading-[1.5] text-[#666666]">
            Basic Salary is <span className="font-[700]">{basicPercent}%</span> of CTC
          </label>
          <span className="text-[14px] font-[600] text-[#1A1A1A]">
            {formatINR(basicAnnual)}/year
          </span>
        </div>
        <input
          type="range"
          min={MIN_BASIC_PERCENT}
          max={MAX_BASIC_PERCENT}
          value={basicPercent}
          onChange={(e) => setBasicPercent(parseInt(e.target.value))}
          className="w-full h-1 bg-[#E0E0E0] rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #3B6FE8 0%, #3B6FE8 ${((basicPercent - MIN_BASIC_PERCENT) / (MAX_BASIC_PERCENT - MIN_BASIC_PERCENT)) * 100}%, #E0E0E0 ${((basicPercent - MIN_BASIC_PERCENT) / (MAX_BASIC_PERCENT - MIN_BASIC_PERCENT)) * 100}%, #E0E0E0 100%)`
          }}
        />
        {basicPercent < MIN_BASIC_PERCENT && (
          <div className="flex items-center gap-1 mt-2">
            <span className="text-[12px] text-[#E74C3C]">ⓘ</span>
            <span className="text-[12px] text-[#E74C3C]">Basic salary cannot be below 25%</span>
          </div>
        )}
        {basicPercent > MAX_BASIC_PERCENT && (
          <div className="flex items-center gap-1 mt-2">
            <span className="text-[12px] text-[#F39C12]">ⓘ</span>
            <span className="text-[12px] text-[#F39C12]">Basic salary above 70% may not be realistic</span>
          </div>
        )}
      </div>

      {/* City Type Toggle */}
      <div className="mb-6">
        <label className="block text-[14px] font-[400] leading-[1.5] text-[#666666] mb-2">
          City Type
        </label>
        <div className="inline-flex border-[1.5px] border-[#E0E0E0] rounded-[999px] p-[3px]">
          <button
            onClick={() => setCityType('METRO')}
            className={`px-4 py-2 rounded-[999px] text-[14px] font-[500] h-9 transition-all duration-150 ease-in-out ${
              cityType === 'METRO'
                ? 'bg-[#000000] text-white'
                : 'bg-transparent text-[#1A1A1A] hover:text-[#666666]'
            }`}
          >
            Metro
          </button>
          <button
            onClick={() => setCityType('NON_METRO')}
            className={`px-4 py-2 rounded-[999px] text-[14px] font-[500] h-9 transition-all duration-150 ease-in-out ${
              cityType === 'NON_METRO'
                ? 'bg-[#000000] text-white'
                : 'bg-transparent text-[#1A1A1A] hover:text-[#666666]'
            }`}
          >
            Non-Metro
          </button>
        </div>
      </div>

      {/* Monthly Rent (Old Regime Only) */}
      {regime === 'OLD' && (
        <div className="mb-6">
          <label className="block text-[14px] font-[400] leading-[1.5] text-[#666666] mb-2">
            Monthly Rent
          </label>
          <div className="relative">
            <input
              type="text"
              value={formatINR(monthlyRent)}
              onChange={(e) => {
                const value = e.target.value.replace(/[₹,]/g, '')
                const num = parseFloat(value) || 0
                if (!isNaN(num)) setMonthlyRent(num)
              }}
              className="w-full text-[16px] font-[600] leading-[1.4] bg-transparent border-b-2 border-[var(--color-border)] focus:border-[var(--color-accent)] outline-none transition-colors"
              placeholder="₹ 0"
            />
          </div>
          {monthlyRent > 0 && monthlyRent * 12 > basicAnnual && (
            <div className="flex items-center gap-1 mt-2">
              <span className="text-[12px] text-[#F39C12]">ⓘ</span>
              <span className="text-[12px] text-[#F39C12]">Rent exceeds basic salary - HRA exemption may be limited</span>
            </div>
          )}
        </div>
      )}

      {/* EPF Type */}
      <div className="mb-6">
        <label className="block text-[14px] font-[400] leading-[1.5] text-[#666666] mb-2">
          EPF Type
        </label>
        <div className="inline-flex border-[1.5px] border-[#E0E0E0] rounded-[999px] p-[3px]">
          <button
            onClick={() => setEpfType('FIXED_1800')}
            className={`px-4 py-2 rounded-[999px] text-[14px] font-[500] h-9 transition-all duration-150 ease-in-out ${
              epfType === 'FIXED_1800'
                ? 'bg-[#000000] text-white'
                : 'bg-transparent text-[#1A1A1A] hover:text-[#666666]'
            }`}
          >
            ₹1,800/month fixed
          </button>
          <button
            onClick={() => setEpfType('TWELVE_PERCENT_BASIC')}
            className={`px-4 py-2 rounded-[999px] text-[14px] font-[500] h-9 transition-all duration-150 ease-in-out ${
              epfType === 'TWELVE_PERCENT_BASIC'
                ? 'bg-[#000000] text-white'
                : 'bg-transparent text-[#1A1A1A] hover:text-[#666666]'
            }`}
          >
            12% of Basic
          </button>
        </div>
      </div>

      {/* Investments (Old Regime Only) */}
      {regime === 'OLD' && (
        <div className="mb-6">
          <label className="block text-[14px] font-[400] leading-[1.5] text-[#666666] mb-2">
            Investments (80C)
          </label>
          <div className="relative">
            <input
              type="text"
              value={formatINR(investments)}
              onChange={(e) => {
                const value = e.target.value.replace(/[₹,]/g, '')
                const num = parseFloat(value) || 0
                if (!isNaN(num)) setInvestments(num)
              }}
              className="w-full text-[16px] font-[600] leading-[1.4] bg-transparent border-b-2 border-[var(--color-border)] focus:border-[var(--color-accent)] outline-none transition-colors"
              placeholder="₹ 0"
            />
          </div>
          {investments > 150000 && (
            <div className="flex items-center gap-1 mt-2">
              <span className="text-[12px] text-[#999999]">ⓘ</span>
              <span className="text-[12px] text-[#999999]">Maximum 80C deduction is ₹1,50,000</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
