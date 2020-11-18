// https://stackoverflow.com/a/1421988
export function isPossiblyNumber(n: string) {
  return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}

// https://stackoverflow.com/a/2901298
export function thousandSeparator(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
