/** JS mirrors of the CSS motion tokens in app/globals.css — keep the two in sync. */
type Bezier = [number, number, number, number]

export const ease = {
  outExpo: [0.16, 1, 0.3, 1] as Bezier,
  inOutQuart: [0.76, 0, 0.24, 1] as Bezier,
}

export const duration = {
  fast: 0.16,
  base: 0.32,
  slow: 0.64,
  reveal: 0.9,
}
