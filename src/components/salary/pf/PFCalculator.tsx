import { useCalculatorStore } from '@/store/useCalculatorStore'
import { usePFCalculation } from '@/hooks/usePFCalculation'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { Slider } from '@/components/ui/slider'

import { PFCorpusOutput } from './PFCorpusOutput'
import { EPFvsEPSExplainer } from './EPFvsEPSExplainer'
import { Pre5YearWarning } from './Pre5YearWarning'

export function PFCalculator() {
  const { pfYears, setPfYears } = useCalculatorStore()
  const calculation = usePFCalculation()

  return (
    <div style={{ backgroundColor: '#EBEBEB', borderRadius: 4, overflow: 'hidden' }}>
      <Accordion type="single" collapsible>
        <AccordionItem value="pf-calculator" className="border-none">
          <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-[#E2E2E2] transition-colors">
            <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)' }}>
              PF Calculator
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2">
            
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
              <Slider
                value={[pfYears]}
                min={1}
                max={30}
                step={1}
                onValueChange={(val) => setPfYears(val[0])}
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

          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
