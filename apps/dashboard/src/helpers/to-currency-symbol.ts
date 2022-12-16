export function toCurrencySymbol(curr: string) {
  if (curr.toLowerCase() === 'eur') {
    return '€';
  } else if (curr.toLowerCase() === 'gbp') {
    return '£';
  } else if (curr.toLowerCase() === 'usd') {
    return '$';
  } else {
    return curr;
  }
}
