import { ImageResponse } from 'next/og'
import { profile } from '@/content/profile'

export const alt = `${profile.fullName} — ${profile.headline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          color: '#e8e9ec',
          backgroundColor: '#0d0e11',
          backgroundImage: 'radial-gradient(circle at 85% 20%, rgba(145,132,248,0.22), transparent 50%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 36, fontWeight: 700, letterSpacing: -1 }}>
          {profile.initials}
          <span style={{ color: '#9184f8' }}>.</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              letterSpacing: -4,
              lineHeight: 1,
              color: '#e8e9ec',
            }}
          >
            {profile.firstName}
          </div>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -4, lineHeight: 1.05 }}>{profile.lastName}</div>
          <div style={{ marginTop: 28, fontSize: 30, color: '#a7acb6' }}>{profile.headline}</div>
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 22, color: '#9184f8' }}>
          <span>Deployed in production</span>
          <span style={{ color: '#3b3f49' }}>•</span>
          <span>Seeking internships</span>
        </div>
      </div>
    ),
    size,
  )
}
