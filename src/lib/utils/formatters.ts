function formatIndianNumber(absRounded: number): string {
  const s = String(absRounded)
  if (s.length <= 3) return s

  const last3 = s.slice(-3)
  const rest = s.slice(0, -3)
  const restWithCommas = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',')
  return `${restWithCommas},${last3}`
}

export function formatINR(amount: number): string {
  if (!Number.isFinite(amount)) return '₹0'

  const sign = amount < 0 ? '-' : ''
  const absRounded = Math.round(Math.abs(amount))
  return `${sign}₹${formatIndianNumber(absRounded)}`
}

export function formatINRCompact(amount: number): string {
  if (!Number.isFinite(amount)) return '₹0'

  const sign = amount < 0 ? '-' : ''
  const abs = Math.round(Math.abs(amount))

  if (abs >= 1_00_00_000) {
    const cr = Math.round(abs / 1_00_00_000)
    return `${sign}₹${cr}Cr`
  }
  if (abs >= 1_00_000) {
    const l = Math.round(abs / 1_00_000)
    return `${sign}₹${l}L`
  }
  return `${sign}₹${formatIndianNumber(abs)}`
}

