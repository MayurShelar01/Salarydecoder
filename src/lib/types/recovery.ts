/**
 * Recovery Label Types
 * Defines the 7 possible recovery classifications for salary components.
 * This is the single source of truth for all recovery label types used
 * across the UI. Labels are informational only and do not affect calculations.
 */
export type RecoveryTag =
  | 'RECEIVED_NOW'
  | 'DEDUCTED_NOW'
  | 'RECEIVED_LATER'
  | 'MAY_GET_BACK'
  | 'EMPLOYER_COST'
  | 'CONDITIONAL'
  | 'NOT_RECEIVED_NOW'
