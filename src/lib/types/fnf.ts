export interface FnFInputs {
  monthlyInhand: number
  monthlyBasic: number
  tenureYears: number
  tenureMonths: number
  daysWorkedLastMonth: number
  remainingLeaves: number
  noticeRequired: 1 | 2 | 3
  noticeServed: number
  bonusOwed: number
  pfCorpus: number
}

export interface FnFResult {
  unpaidSalary: number
  leaveEncashment: number
  pfWithdrawal: number
  gratuity: number
  bonusOwed: number
  noticeDeduction: number
  totalFnF: number
}

