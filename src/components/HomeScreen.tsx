import { useState } from 'react'
import { useCalculatorStore } from '@/store/useCalculatorStore'
import { useSalaryCalculation } from '@/hooks/useSalaryCalculation'
import { formatINR } from '@/lib/utils/formatters'
import { BreakdownLineItem } from './salary/BreakdownLineItem'


export function HomeScreen() {
  const {
    ctc,
    variableComponent,
    basicPercent,
    regime,
    viewMode,
    setCtc,
    setVariableComponent,
    setBasicPercent,
    setRegime,
    setViewMode,
  } = useCalculatorStore()

  const [showBreakdown, setShowBreakdown] = useState(false)

  const breakdown = useSalaryCalculation()

  const basicAnnual = ctc * (basicPercent / 100)

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

  const getAmount = (annual: number, monthly: number) =>
    viewMode === 'YEARLY' ? annual : monthly

  const handleCalculate = () => {
    setShowBreakdown(true)
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-page)]">
      <div className="mx-auto px-5 py-8" style={{ maxWidth: 480 }}>

        {/* ── Title ── */}
        <h1 style={{
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 700,
          lineHeight: 1.3,
          color: 'var(--color-text-primary)',
          marginBottom: 8,
        }}>
          Salary Calculator
        </h1>

        {/* ── Description ── */}
        <p style={{
          fontSize: 13,
          fontWeight: 400,
          lineHeight: 1.6,
          color: 'var(--color-text-secondary)',
          marginBottom: 20,
        }}>
          The salary calculator helps estimate in-hand salary based on CTC,
          deductions, and chosen tax regime.
        </p>

        {/* ── Regime Toggle (left-aligned, green active) ── */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 28 }}>
          <button
            onClick={() => setRegime('OLD')}
            style={{
              padding: '8px 18px',
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              backgroundColor: regime === 'OLD' ? 'var(--color-action)' : 'transparent',
              color: regime === 'OLD' ? '#fff' : 'var(--color-text-primary)',
            }}
          >
            Old regime
          </button>
          <button
            onClick={() => setRegime('NEW')}
            style={{
              padding: '8px 18px',
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              backgroundColor: regime === 'NEW' ? 'var(--color-action)' : 'transparent',
              color: regime === 'NEW' ? '#fff' : 'var(--color-text-primary)',
            }}
          >
            New regime
          </button>
        </div>

        {/* ── Cost to Company (CTC) ── */}
        <div style={{ marginBottom: 28 }}>
          <label style={{
            display: 'block',
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 1.5,
            color: 'var(--color-text-secondary)',
            marginBottom: 8,
          }}>
            Cost to Company (CTC)
          </label>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid var(--color-border)',
            paddingBottom: 8,
          }}>
            <span style={{
              fontSize: 18,
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginRight: 8,
            }}>₹</span>
            <input
              type="text"
              value={ctc === 0 ? '' : formatINR(ctc).replace('₹', '').trim()}
              onChange={(e) => {
                const value = e.target.value.replace(/[,]/g, '')
                const num = parseFloat(value)
                setCtc(isNaN(num) ? 0 : num)
              }}
              placeholder="Enter Value"
              style={{
                flex: 1,
                fontSize: 18,
                fontWeight: 600,
                lineHeight: 1.4,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--color-text-primary)',
                padding: 0,
              }}
            />
          </div>
        </div>

        {/* ── Variable Component ── */}
        <div style={{ marginBottom: 28 }}>
          <label style={{
            display: 'block',
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 1.5,
            color: 'var(--color-text-secondary)',
            marginBottom: 8,
          }}>
            Variable Component
          </label>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid var(--color-border)',
            paddingBottom: 8,
          }}>
            <span style={{
              fontSize: 18,
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginRight: 8,
            }}>₹</span>
            <input
              type="text"
              value={variableComponent === 0 ? '' : formatINR(variableComponent).replace('₹', '').trim()}
              onChange={(e) => {
                const value = e.target.value.replace(/[,]/g, '')
                const num = parseFloat(value)
                setVariableComponent(isNaN(num) ? 0 : num)
              }}
              placeholder="Enter Value"
              style={{
                flex: 1,
                fontSize: 18,
                fontWeight: 600,
                lineHeight: 1.4,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--color-text-primary)',
                padding: 0,
              }}
            />
          </div>
        </div>

        {/* ── Basic Salary Slider ── */}
        <div style={{ marginBottom: 32 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}>
            <span style={{
              fontSize: 14,
              fontWeight: 400,
              lineHeight: 1.5,
              color: 'var(--color-text-secondary)',
            }}>
              Basic Salary is{' '}
              <span style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>
                {basicPercent}%
              </span>{' '}
              of CTC
            </span>
            <span style={{
              fontSize: 16,
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              fontStyle: 'italic',
            }}>
              ₹ {basicAnnual > 0 ? formatINR(basicAnnual).replace('₹', '').trim() : '0'}
            </span>
          </div>
          <input
            type="range"
            min="25"
            max="70"
            value={basicPercent}
            onChange={(e) => setBasicPercent(parseInt(e.target.value))}
            className="slider-input"
            style={{
              width: '100%',
              height: 4,
              borderRadius: 2,
              background: `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${((basicPercent - 25) / 45) * 100}%, var(--color-accent-light) ${((basicPercent - 25) / 45) * 100}%, var(--color-accent-light) 100%)`,
              outline: 'none',
              cursor: 'pointer',
            }}
          />
        </div>

        {/* ── Calculate Instantly Button (GREEN) ── */}
        <button
          onClick={handleCalculate}
          style={{
            width: '100%',
            height: 52,
            borderRadius: 999,
            border: 'none',
            backgroundColor: 'var(--color-action)',
            color: '#fff',
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: 0.3,
            cursor: 'pointer',
            transition: 'background 0.2s ease, transform 0.1s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-action-hover)')}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-action)'
            e.currentTarget.style.transform = 'scale(1)'
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.97)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {showBreakdown ? 'Re-Calculate Instantly' : 'Calculate Instantly'}
        </button>

        {/* ── Salary Breakdown (revealed on Calculate) ── */}
        {showBreakdown && (
          <div style={{
            marginTop: 32,
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
            padding: '24px 20px 28px',
            animation: 'slideUp 0.3s ease-out',
          }}>

            {/* In-hand Salary Hero */}
            <div style={{ marginBottom: 16 }}>
              <p style={{
                fontSize: 13,
                fontWeight: 400,
                lineHeight: 1.6,
                color: 'var(--color-text-secondary)',
                marginBottom: 4,
              }}>
                Your In-hand Salary is
              </p>
              <p style={{
                fontSize: 28,
                fontWeight: 700,
                lineHeight: 1.2,
                color: 'var(--color-positive)',
              }}>
                ₹ {formatINR(monthlyNetInhand).replace('₹', '').trim()}{' '}
                <span style={{
                  fontSize: 13,
                  fontWeight: 400,
                  color: 'var(--color-text-secondary)',
                }}>/month</span>
              </p>
            </div>

            {/* ── Divider ── */}
            <div style={{
              borderTop: '1px solid var(--color-border)',
              marginBottom: 16,
            }} />

            {/* Detailed Salary Calculation heading */}
            <p style={{
              fontSize: 14,
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: 10,
            }}>
              Detailed Salary Calculation
            </p>

            {/* Monthly / Yearly toggle (inline, black active pill) */}
            <div style={{
              display: 'inline-flex',
              border: '1.5px solid var(--color-border)',
              borderRadius: 999,
              padding: 3,
              marginBottom: 16,
            }}>
              <button
                onClick={() => setViewMode('MONTHLY')}
                style={{
                  padding: '4px 14px',
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 600,
                  height: 32,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  backgroundColor: viewMode === 'MONTHLY' ? '#000' : 'transparent',
                  color: viewMode === 'MONTHLY' ? '#fff' : 'var(--color-text-primary)',
                }}
              >
                Monthly
              </button>
              <button
                onClick={() => setViewMode('YEARLY')}
                style={{
                  padding: '4px 14px',
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 600,
                  height: 32,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  backgroundColor: viewMode === 'YEARLY' ? '#000' : 'transparent',
                  color: viewMode === 'YEARLY' ? '#fff' : 'var(--color-text-primary)',
                }}
              >
                Yearly
              </button>
            </div>

            {/* Earnings */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <BreakdownLineItem
                label="Basic Salary"
                amount={getAmount(basic, basic / 12)}
                dotColor="var(--color-dot-basic)"
              />
              <BreakdownLineItem
                label="HRA"
                amount={getAmount(hra, hra / 12)}
                dotColor="var(--color-dot-hra)"
              />
              <BreakdownLineItem
                label="Special Allowances"
                amount={getAmount(specialAllowance, specialAllowance / 12)}
                dotColor="var(--color-dot-allowance)"
              />
            </div>

            {/* Gross Salary */}
            <div style={{
              marginTop: 16,
              paddingTop: 12,
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                Gross Salary
              </span>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                ₹ {formatINR(getAmount(grossSalary, monthlyGross)).replace('₹', '').trim()}
              </span>
            </div>

            {/* Deductions Header */}
            <div style={{ marginTop: 20, marginBottom: 8 }}>
              <span style={{
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--color-text-secondary)',
              }}>
                Deductions from Salary
              </span>
            </div>

            {/* Deductions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <BreakdownLineItem
                label="EPF Contribution"
                amount={getAmount(employeeEPF, monthlyEmployeeEPF)}
                isDeduction
                dotColor="var(--color-dot-epf)"
              />
              <BreakdownLineItem
                label="Tax Payable"
                amount={getAmount(finalAnnualTax, monthlyTax)}
                isDeduction
                dotColor="var(--color-dot-tax)"
              />
            </div>

            {/* Net In-hand Salary */}
            <div style={{
              marginTop: 16,
              paddingTop: 12,
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                Net In-hand Salary
              </span>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-positive)' }}>
                ₹ {formatINR(getAmount(annualNetInhand, monthlyNetInhand)).replace('₹', '').trim()}
              </span>
            </div>

            {/* Contextual notices */}
            {rebate87A > 0 && finalAnnualTax === 0 && (
              <div style={{
                marginTop: 16, padding: 12,
                backgroundColor: '#D5F4E6', borderRadius: 4,
              }}>
                <p style={{ fontSize: 12, fontWeight: 400, lineHeight: 1.5, color: '#2ECC71' }}>
                  ⓘ Your tax is ₹0 due to Section 87A rebate.
                </p>
              </div>
            )}
            {hraExemption > 0 && (
              <div style={{
                marginTop: 12, padding: 12,
                backgroundColor: '#D0DEFF', borderRadius: 4,
              }}>
                <p style={{ fontSize: 12, fontWeight: 400, lineHeight: 1.5, color: '#3B6FE8' }}>
                  ⓘ HRA exemption of {formatINR(hraExemption)} applied under Old Regime.
                </p>
              </div>
            )}
            {surcharge > 0 && (
              <div style={{
                marginTop: 12, padding: 12,
                backgroundColor: '#FEF5E7', borderRadius: 4,
              }}>
                <p style={{ fontSize: 12, fontWeight: 400, lineHeight: 1.5, color: '#F39C12' }}>
                  ⓘ Surcharge applied. Consult a CA for exact figures.
                </p>
              </div>
            )}
          </div>
        )}

      </div>

      {/* ── Slider thumb + animation styles ── */}
      <style>{`
        .slider-input {
          -webkit-appearance: none;
          appearance: none;
        }
        .slider-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--color-accent);
          border: 2px solid #fff;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
          cursor: pointer;
        }
        .slider-input::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--color-accent);
          border: 2px solid #fff;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
          cursor: pointer;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
