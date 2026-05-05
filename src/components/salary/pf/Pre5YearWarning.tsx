import { AlertTriangle } from 'lucide-react'

interface Pre5YearWarningProps {
  show: boolean
}

export function Pre5YearWarning({ show }: Pre5YearWarningProps) {
  if (!show) return null

  return (
    <div style={{
      display: 'flex',
      gap: 12,
      marginTop: 16,
      padding: 16,
      backgroundColor: '#FEF5E7', // Amber light bg
      border: '1px solid #FAD7A1', // Amber border
      borderRadius: 8
    }}>
      <AlertTriangle size={20} color="#F39C12" style={{ flexShrink: 0, marginTop: 2 }} />
      <p style={{ fontSize: 13, lineHeight: 1.5, color: '#D68910', margin: 0 }}>
        Withdrawing PF before 5 years of continuous service makes the amount taxable at your slab rate. Transfer to your next employer to avoid tax.
      </p>
    </div>
  )
}
