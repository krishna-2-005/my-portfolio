import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

/** Home-screen icon: the same K monogram as app/icon.svg, full-bleed (iOS rounds the corners). */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: '#9184f8',
        }}
      >
        <svg width="180" height="180" viewBox="0 0 64 64">
          <path
            d="M22 15v34M22 33 41 15M29 27l14 22"
            fill="none"
            stroke="#0d0e11"
            strokeWidth="7.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    size,
  )
}
