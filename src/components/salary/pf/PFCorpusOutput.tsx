import { formatINR } from '@/lib/utils/formatters'

interface PFCorpusOutputProps {
  withdrawableCorpus: number
  employeeContribution: number
  employerEPFContribution: number
  interestEarned: number
}

export function PFCorpusOutput({
  withdrawableCorpus,
  employeeContribution,
  employerEPFContribution,
  interestEarned
}: PFCorpusOutputProps) {
  return (
    <div style={{ marginTop: 24 }}>
      {/* Hero Number */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
          Withdrawable PF Corpus
        </h3>
        <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--color-positive)', display: 'flex', alignItems: 'baseline', gap: 4 }}>
          ₹ {formatINR(withdrawableCorpus).replace('₹', '').trim()}
        </div>
      </div>

      {/* Breakdown Lines */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 16, borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>Your contributions</span>
          <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)' }}>{formatINR(employeeContribution)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>Employer EPF <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>(withdrawable portion)</span></span>
          <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)' }}>{formatINR(employerEPFContribution)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>Interest earned</span>
          <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-positive)' }}>+ {formatINR(interestEarned)}</span>
        </div>
      </div>
    </div>
  )
}
