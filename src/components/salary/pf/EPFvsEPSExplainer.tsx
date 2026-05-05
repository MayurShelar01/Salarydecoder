import { formatINR } from '@/lib/utils/formatters'

interface EPFvsEPSExplainerProps {
  epsCorpus: number
}

export function EPFvsEPSExplainer({ epsCorpus }: EPFvsEPSExplainerProps) {
  return (
    <div style={{ marginTop: 16, padding: 16, backgroundColor: 'var(--color-bg-page)', borderRadius: 8, border: '1px solid var(--color-border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>EPS Pension Corpus</h4>
        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>{formatINR(epsCorpus)}</span>
      </div>
      <p style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--color-text-secondary)', margin: 0 }}>
        This portion becomes a pension after age 58 and is not withdrawable as a lump sum.
      </p>
    </div>
  )
}
