import { useCalculatorStore } from '@/store/useCalculatorStore'
import { usePFCalculation } from '@/hooks/usePFCalculation'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

import { PFCorpusOutput } from './PFCorpusOutput'
import { EPFvsEPSExplainer } from './EPFvsEPSExplainer'
import { Pre5YearWarning } from './Pre5YearWarning'

export function PFCalculator() {
  const { pfYears, setPfYears } = useCalculatorStore()
  const calculation = usePFCalculation()

  return (
    <div style={{ marginTop: 24 }}>
      <Accordion type="single" collapsible>
        <AccordionItem 
          value="pf-calculator" 
          style={{ 
            backgroundColor: 'transparent', 
            borderRadius: 8, 
            border: '1px solid var(--color-border)', 
            overflow: 'hidden' 
          }}
        >
          <AccordionTrigger className="px-5 py-4 bg-transparent border-none outline-none hover:no-underline hover:bg-transparent shadow-none">
            <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--color-text-secondary)' }}>
              PF Calculator
            </span>
          </AccordionTrigger>
          <AccordionContent className="border-none p-0">
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
              padding: '24px 20px 28px',
              margin: '0 16px 16px 16px',
            }}>
            
            {/* Slider Section */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <label style={{ fontSize: 14, color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                  Years of PF accumulation
                </label>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {pfYears} {pfYears === 1 ? 'year' : 'years'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={pfYears}
                onChange={(e) => setPfYears(parseInt(e.target.value))}
                className="slider-input"
                style={{
                  width: '100%',
                  height: 4,
                  borderRadius: 2,
                  background: `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${((pfYears - 1) / 29) * 100}%, var(--color-border) ${((pfYears - 1) / 29) * 100}%, var(--color-border) 100%)`,
                  outline: 'none',
                  cursor: 'pointer',
                }}
              />
            </div>

            {/* Results Section */}
            {calculation ? (
              <>
                <PFCorpusOutput
                  withdrawableCorpus={calculation.withdrawableCorpus}
                  employeeContribution={calculation.employeeContribution}
                  employerEPFContribution={calculation.employerEPFContribution}
                  interestEarned={calculation.interestEarned}
                />
                <EPFvsEPSExplainer epsCorpus={calculation.epsCorpus} />
                <Pre5YearWarning show={calculation.preFiveYearTax} />
              </>
            ) : (
              <p style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>
                Please enter your salary details to calculate PF.
              </p>
            )}

            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
