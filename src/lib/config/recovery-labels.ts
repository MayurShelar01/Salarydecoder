/**
 * Recovery Labels Configuration
 * Single source of truth for all recovery label tooltip titles and copy.
 * UI components must read from here — never hardcode tooltip text inline.
 */
import type { RecoveryTag } from '@/lib/types/recovery'

interface RecoveryLabelConfig {
  /** Short label displayed inside the tooltip header */
  title: string
  /** Full explanation shown in the tooltip body */
  copy: string
}

export const RECOVERY_LABEL_CONFIG: Record<RecoveryTag, RecoveryLabelConfig> = {
  RECEIVED_NOW: {
    title: 'You get this',
    copy: 'This amount is part of your regular salary and contributes to your in-hand pay.',
  },

  DEDUCTED_NOW: {
    title: 'Deducted now',
    copy: 'This amount reduces your current in-hand salary.',
  },

  RECEIVED_LATER: {
    title: 'You get this later',
    copy: 'This is deducted from your salary now, but usually remains yours and may be available later through withdrawal, transfer, or settlement rules.',
  },

  MAY_GET_BACK: {
    title: 'You may get some back',
    copy: 'This is income tax/TDS. Your final tax may change after deductions, declarations, or ITR filing. You may receive a refund if excess tax is deducted.',
  },

  EMPLOYER_COST: {
    title: 'Employer cost',
    copy: 'This is part of your CTC paid or provisioned by the employer. It is not deducted from your monthly in-hand salary.',
  },

  CONDITIONAL: {
    title: 'Conditional',
    copy: 'This amount depends on eligibility rules, declarations, tenure, or company policy. Confirm the exact treatment with HR or a CA.',
  },

  NOT_RECEIVED_NOW: {
    title: 'Not in-hand',
    copy: 'This amount is part of compensation or statutory structure, but it is not paid as monthly in-hand salary.',
  },
}
