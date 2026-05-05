import type { PFInputs, PFCorpus } from '@/lib/types/pf'
import {
  EPF_INTEREST_RATE,
  EMPLOYER_EPF_RATE,
  EMPLOYER_EPS_RATE,
  EMPLOYER_EPF_MONTHLY_CAP,
  EMPLOYER_EPS_MONTHLY_CAP,
  EPF_MONTHLY_FIXED,
} from '@/lib/config/constants'

export function calculatePFCorpus(inputs: PFInputs): PFCorpus {
  // 1. Derive monthly contributions:
  const monthlyBasic = inputs.monthlyBasic;
  const employeePF = Math.min(monthlyBasic * 0.12, EPF_MONTHLY_FIXED);
  const employerEPF = Math.min(monthlyBasic * EMPLOYER_EPF_RATE, EMPLOYER_EPF_MONTHLY_CAP);
  const employerEPS = Math.min(monthlyBasic * EMPLOYER_EPS_RATE, EMPLOYER_EPS_MONTHLY_CAP);

  // 2. Simulate month-by-month compounding:
  let corpus = 0;
  const months = inputs.years * 12;
  for (let i = 0; i < months; i++) {
    corpus = (corpus + employeePF + employerEPF) * (1 + EPF_INTEREST_RATE / 12);
  }

  // 3. Compute aggregates:
  const totalEmployee = employeePF * months;
  const totalEmployerEPF = employerEPF * months;
  const interestEarned = corpus - (totalEmployee + totalEmployerEPF);
  const epsCorpus = employerEPS * months;
  const withdrawableCorpus = Math.round(corpus);
  const preFiveYearTax = inputs.years < 5;

  // 4. Return PFCorpus object
  return {
    withdrawableCorpus,
    employeeContribution: totalEmployee,
    employerEPFContribution: totalEmployerEPF,
    interestEarned: Math.round(interestEarned),
    epsCorpus,
    preFiveYearTax
  };
}
