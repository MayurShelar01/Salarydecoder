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


const A = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
const B = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

export function numberToIndianWords(num: number): string {
  if (num === 0) return '';
  if (num < 0) return '';
  if (num > 999999999) return 'Amount too large';

  const n = ('000000000' + num).slice(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return '';

  let str = '';
  str += (n[1] != '00') ? (A[Number(n[1])] || B[Number(n[1][0])] + ' ' + A[Number(n[1][1])]) + 'crore ' : '';
  str += (n[2] != '00') ? (A[Number(n[2])] || B[Number(n[2][0])] + ' ' + A[Number(n[2][1])]) + 'lakh ' : '';
  str += (n[3] != '00') ? (A[Number(n[3])] || B[Number(n[3][0])] + ' ' + A[Number(n[3][1])]) + 'thousand ' : '';
  str += (n[4] != '0') ? (A[Number(n[4])] || B[Number(n[4][0])] + ' ' + A[Number(n[4][1])]) + 'hundred ' : '';
  str += (n[5] != '00') ? ((str != '') ? 'and ' : '') + (A[Number(n[5])] || B[Number(n[5][0])] + ' ' + A[Number(n[5][1])]) : '';

  const words = str.trim() + ' only';
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export function formatINRWithLacs(amount: number): string {
  if (!Number.isFinite(amount) || amount === 0) return ''
  const abs = Math.round(Math.abs(amount))
  
  if (abs >= 1_00_00_000) {
    const cr = abs / 1_00_00_000
    return `${Number.isInteger(cr) ? cr : cr.toFixed(2)} Crores`
  }
  if (abs >= 1_00_000) {
    const l = abs / 1_00_000
    return `${Number.isInteger(l) ? l : l.toFixed(2)} Lacs`
  }
  return formatIndianNumber(abs)
}
