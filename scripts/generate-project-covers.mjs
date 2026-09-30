// Generates the abstract project covers in public/projects/ (no screenshots exist yet).
// Run: node scripts/generate-project-covers.mjs
import fs from 'node:fs'
import path from 'node:path'

const W = 1200
const H = 800
const out = path.join(process.cwd(), 'public', 'projects')

const tint = {
  Deployed: '#34d399',
  'Live Demo': '#60a5fa',
  Awarded: '#fbbf24',
  'In Development': '#27e7f9',
  Prototype: '#a480ff',
}

const line = (opacity = 0.9, fill = 'fill="none"') =>
  `stroke="#ffffff" stroke-opacity="${opacity}" stroke-width="4" ${fill} stroke-linecap="round" stroke-linejoin="round"`

// One motif per project, drawn around (cx, cy).
const motifs = {
  'diagnostics-center': (c) => `
    <path d="M${c.x - 40} ${c.y - 130}h80v90h90v80h-90v90h-80v-90h-90v-80h90z" ${line()}/>
    <path d="M120 ${c.y + 190}h260l30-60 40 120 36-170 34 110h560" ${line(0.55)}/>`,
  'ica-tracker': (c) => `
    ${[0, 1, 2, 3, 4].map((i) => `<rect x="${c.x - 190 + i * 80}" y="${c.y + 120 - (i + 1) * 45}" width="48" height="${(i + 1) * 45}" rx="8" ${line()}/>`).join('')}
    <circle cx="${c.x + 240}" cy="${c.y - 170}" r="46" ${line()}/>
    <path d="m${c.x + 218} ${c.y - 170} 16 16 30-32" ${line()}/>`,
  'certificate-app': (c) => `
    <circle cx="${c.x}" cy="${c.y - 30}" r="110" ${line()}/>
    <circle cx="${c.x}" cy="${c.y - 30}" r="72" ${line(0.5)}/>
    <path d="m${c.x - 60} ${c.y + 60} -40 150 60-30 30 55 40-130M${c.x + 60} ${c.y + 60}l40 150-60-30-30 55-40-130" ${line()}/>`,
  'emergency-sos': (c) => `
    ${[90, 150, 210].map((r, i) => `<circle cx="${c.x}" cy="${c.y + 40}" r="${r}" ${line(0.6 - i * 0.18)}/>`).join('')}
    <path d="M${c.x} ${c.y + 90}c-50-60-70-92-70-122a70 70 0 0 1 140 0c0 30-20 62-70 122z" ${line()}/>
    <circle cx="${c.x}" cy="${c.y - 34}" r="22" ${line()}/>`,
  digielev8: (c) => `
    <path d="M${c.x - 260} ${c.y + 150}l110-80 90 40 120-130 90 50 130-150" ${line()}/>
    <path d="M${c.x + 210} ${c.y - 150}h70v70" ${line()}/>
    ${[0, 1, 2, 3, 4, 5].map((i) => `<circle cx="${c.x - 260 + i * 108}" cy="${c.y + 210}" r="4" fill="#fff" fill-opacity="0.5"/>`).join('')}`,
  'churn-prediction': (c) => {
    let dots = ''
    let seed = 7
    const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280)
    for (let i = 0; i < 46; i++) {
      const x = c.x - 260 + rnd() * 520
      const y = c.y - 170 + rnd() * 340
      const above = y < c.y + 120 * Math.tanh((x - c.x) / 120)
      dots += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="9" ${above ? 'fill="#ffffff" fill-opacity="0.8"' : line(0.7)}/>`
    }
    return `${dots}<path d="M${c.x - 280} ${c.y - 120}C${c.x - 60} ${c.y - 120} ${c.x + 60} ${c.y + 120} ${c.x + 280} ${c.y + 120}" ${line()} stroke-dasharray="14 12"/>`
  },
  'logistics-control-tower': (c) => {
    const nodes = [[-220, -120], [-60, -170], [110, -110], [240, -10], [150, 140], [-40, 110], [-200, 60], [30, -10]]
    const edges = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0], [7, 0], [7, 2], [7, 4], [7, 5], [1, 7]]
    return edges.map(([a, b]) => `<path d="M${c.x + nodes[a][0]} ${c.y + nodes[a][1]}L${c.x + nodes[b][0]} ${c.y + nodes[b][1]}" ${line(0.45)}/>`).join('') +
      nodes.map(([x, y], i) => `<circle cx="${c.x + x}" cy="${c.y + y}" r="${i === 7 ? 30 : 14}" ${i === 7 ? 'fill="#fff" fill-opacity="0.9"' : line()}/>`).join('')
  },
  'land-lekha': (c) => `
    <path d="M${c.x - 150} ${c.y - 200}h220l80 80v320h-300z" ${line()}/>
    <path d="M${c.x + 70} ${c.y - 200}v80h80" ${line()}/>
    ${[0, 1, 2, 3, 4].map((i) => `<path d="M${c.x - 110} ${c.y - 90 + i * 50}h${i % 2 ? 150 : 210}" ${line(0.5)}/>`).join('')}
    <circle cx="${c.x + 170}" cy="${c.y + 150}" r="56" ${line(0.9, 'fill="#0a0b16" fill-opacity="0.9"')}/>
    <path d="m${c.x + 145} ${c.y + 150} 18 18 34-36" ${line()}/>`,
  'deepfake-detection': (c) => {
    let wave = ''
    for (let i = 0; i < 36; i++) {
      const h = 20 + Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.21)) * 190
      wave += `<path d="M${c.x - 280 + i * 16} ${c.y - h / 2}v${h}" ${line(i > 22 ? 0.9 : 0.45)}/>`
    }
    return wave + `<path d="M${c.x + 150} ${c.y - 210}l70 120h-140z" ${line()}/><path d="M${c.x + 150} ${c.y - 170}v36M${c.x + 150} ${c.y - 116}v4" ${line()}/>`
  },
  'skin-cancer': (c) => `
    <circle cx="${c.x}" cy="${c.y}" r="200" ${line(0.35)}/>
    <path d="M${c.x - 70} ${c.y - 40}c30-60 110-50 130 0s-10 100-70 100-90-40-60-100z" ${line(0.9, 'fill="#fff" fill-opacity="0.18"')}/>
    <path d="M${c.x - 200} ${c.y}h60M${c.x + 140} ${c.y}h60M${c.x} ${c.y - 200}v60M${c.x} ${c.y + 140}v60" ${line()}/>
    <rect x="${c.x - 130}" y="${c.y - 130}" width="260" height="260" rx="18" ${line(0.5)} stroke-dasharray="16 14"/>`,
  'nmims-events': (c) => `
    <rect x="${c.x - 200}" y="${c.y - 160}" width="400" height="320" rx="24" ${line()}/>
    <path d="M${c.x - 200} ${c.y - 90}h400M${c.x - 120} ${c.y - 190}v60M${c.x + 120} ${c.y - 190}v60" ${line()}/>
    ${[0, 1, 2].map((r) => [0, 1, 2, 3].map((k) => `<rect x="${c.x - 170 + k * 88}" y="${c.y - 65 + r * 72}" width="64" height="50" rx="8" ${r === 1 && k === 2 ? 'fill="#fff" fill-opacity="0.9"' : `${line(0.35)}`}/>`).join('')).join('')}`,
}

const svg = (slug, status) => {
  const c = { x: 620, y: 410 }
  const t = tint[status]
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="a" cx="72%" cy="32%" r="60%"><stop offset="0" stop-color="${t}" stop-opacity="0.55"/><stop offset="1" stop-color="${t}" stop-opacity="0"/></radialGradient>
    <radialGradient id="b" cx="15%" cy="90%" r="65%"><stop offset="0" stop-color="#6d3fd6" stop-opacity="0.7"/><stop offset="1" stop-color="#6d3fd6" stop-opacity="0"/></radialGradient>
    <pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0v40" fill="none" stroke="#fff" stroke-opacity="0.06"/></pattern>
    <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.07 0"/></filter>
  </defs>
  <rect width="${W}" height="${H}" fill="#0a0b16"/>
  <rect width="${W}" height="${H}" fill="url(#b)"/>
  <rect width="${W}" height="${H}" fill="url(#a)"/>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <g>${motifs[slug](c)}</g>
  <rect width="${W}" height="${H}" filter="url(#n)"/>
</svg>
`
}

// Keep in sync with content/projects.ts (slug → status).
const projects = {
  'diagnostics-center': 'Deployed',
  'ica-tracker': 'Deployed',
  'certificate-app': 'Prototype',
  'emergency-sos': 'Prototype',
  digielev8: 'In Development',
  'churn-prediction': 'In Development',
  'nmims-events': 'Awarded',
  'logistics-control-tower': 'Live Demo',
  'land-lekha': 'Live Demo',
  'deepfake-detection': 'In Development',
  'skin-cancer': 'Prototype',
}

fs.mkdirSync(out, { recursive: true })
for (const [slug, status] of Object.entries(projects)) {
  fs.writeFileSync(path.join(out, `${slug}.svg`), svg(slug, status))
  console.log(`public/projects/${slug}.svg`)
}
