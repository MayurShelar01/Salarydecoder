import { create } from 'zustand'

import { INVESTMENT_80C_CAP } from '@/lib/config/constants'
import type { CityType, EPFType, TaxRegime, ViewMode } from '@/lib/types'

interface CalculatorState {
  regime: TaxRegime
  ctc: number
  variableComponent: number
  basicPercent: number
  cityType: CityType
  monthlyRent: number
  epfType: EPFType
  investments: number

  viewMode: ViewMode

  pfYears: number

  fnfTenureYears: number
  fnfTenureMonths: number
  fnfDaysWorkedLastMonth: number
  fnfRemainingLeaves: number
  fnfNoticeRequired: 1 | 2 | 3
  fnfNoticeServed: number
  fnfBonusOwed: number

  setRegime: (regime: TaxRegime) => void
  setCtc: (ctc: number) => void
  setVariableComponent: (variableComponent: number) => void
  setBasicPercent: (basicPercent: number) => void
  setCityType: (cityType: CityType) => void
  setMonthlyRent: (monthlyRent: number) => void
  setEpfType: (epfType: EPFType) => void
  setInvestments: (investments: number) => void

  setViewMode: (viewMode: ViewMode) => void

  setPfYears: (pfYears: number) => void

  setFnfTenureYears: (fnfTenureYears: number) => void
  setFnfTenureMonths: (fnfTenureMonths: number) => void
  setFnfDaysWorkedLastMonth: (fnfDaysWorkedLastMonth: number) => void
  setFnfRemainingLeaves: (fnfRemainingLeaves: number) => void
  setFnfNoticeRequired: (fnfNoticeRequired: 1 | 2 | 3) => void
  setFnfNoticeServed: (fnfNoticeServed: number) => void
  setFnfBonusOwed: (fnfBonusOwed: number) => void

  reset: () => void
}

const DEFAULTS: Omit<
  CalculatorState,
  | 'setRegime'
  | 'setCtc'
  | 'setVariableComponent'
  | 'setBasicPercent'
  | 'setCityType'
  | 'setMonthlyRent'
  | 'setEpfType'
  | 'setInvestments'
  | 'setViewMode'
  | 'setPfYears'
  | 'setFnfTenureYears'
  | 'setFnfTenureMonths'
  | 'setFnfDaysWorkedLastMonth'
  | 'setFnfRemainingLeaves'
  | 'setFnfNoticeRequired'
  | 'setFnfNoticeServed'
  | 'setFnfBonusOwed'
  | 'reset'
> = {
  regime: 'NEW',
  ctc: 350000,
  variableComponent: 0,
  basicPercent: 50,
  cityType: 'METRO',
  monthlyRent: 0,
  epfType: 'FIXED_1800',
  investments: 0,

  viewMode: 'MONTHLY',

  pfYears: 5,

  fnfTenureYears: 0,
  fnfTenureMonths: 0,
  fnfDaysWorkedLastMonth: 0,
  fnfRemainingLeaves: 0,
  fnfNoticeRequired: 2,
  fnfNoticeServed: 0,
  fnfBonusOwed: 0,
}

export const useCalculatorStore = create<CalculatorState>((set) => ({
  ...DEFAULTS,

  setRegime: (regime) => set({ regime }),
  setCtc: (ctc) => set({ ctc }),
  setVariableComponent: (variableComponent) => set({ variableComponent }),
  setBasicPercent: (basicPercent) => set({ basicPercent }),
  setCityType: (cityType) => set({ cityType }),
  setMonthlyRent: (monthlyRent) => set({ monthlyRent }),
  setEpfType: (epfType) => set({ epfType }),
  setInvestments: (investments) =>
    set({ investments: Math.max(0, Math.min(INVESTMENT_80C_CAP, investments)) }),

  setViewMode: (viewMode) => set({ viewMode }),

  setPfYears: (pfYears) => set({ pfYears }),

  setFnfTenureYears: (fnfTenureYears) => set({ fnfTenureYears }),
  setFnfTenureMonths: (fnfTenureMonths) => set({ fnfTenureMonths }),
  setFnfDaysWorkedLastMonth: (fnfDaysWorkedLastMonth) =>
    set({ fnfDaysWorkedLastMonth }),
  setFnfRemainingLeaves: (fnfRemainingLeaves) => set({ fnfRemainingLeaves }),
  setFnfNoticeRequired: (fnfNoticeRequired) => set({ fnfNoticeRequired }),
  setFnfNoticeServed: (fnfNoticeServed) => set({ fnfNoticeServed }),
  setFnfBonusOwed: (fnfBonusOwed) => set({ fnfBonusOwed }),

  reset: () => set(DEFAULTS),
}))

