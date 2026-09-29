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
          color: '#f3f2fb',
          backgroundColor: '#060810',
          backgroundImage:
            'radial-gradient(circle at 82% 30%, rgba(164,128,255,0.55), transparent 45%), radial-gradient(circle at 92% 85%, rgba(39,231,249,0.28), transparent 40%), radial-gradient(circle at 5% 100%, rgba(79,37,158,0.6), transparent 45%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 36, fontWeight: 700, letterSpacing: -1 }}>
          {profile.initials}
          <span style={{ color: '#27e7f9' }}>.</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              letterSpacing: -4,
              lineHeight: 1,
              backgroundImage: 'linear-gradient(90deg, #a480ff, #27e7f9)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {profile.firstName}
          </div>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -4, lineHeight: 1.05 }}>{profile.lastName}</div>
          <div style={{ marginTop: 28, fontSize: 30, color: '#b9b7cc' }}>{profile.headline}</div>
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 22, color: '#27e7f9' }}>
          <span>Deployed in production</span>
          <span style={{ color: '#4a4960' }}>•</span>
          <span>Seeking internships</span>
        </div>
      </div>
    ),
    size,
  )
}
