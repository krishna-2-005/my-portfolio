// Content inventory for the redesign audit.
// Compiles content/*.ts with the repo's own TypeScript (no extra deps) and prints every entry.
// Usage: node redesign-audit/inventory.mjs > redesign-audit/inventory-<before|after>.md
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const ts = require('typescript')
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const cache = {}
function load(name) {
  if (cache[name]) return cache[name]
  const src = fs.readFileSync(path.join(root, 'content', `${name}.ts`), 'utf8')
  const { outputText } = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } })
  const mod = { exports: {} }
  const req = (spec) => (spec.startsWith('./') ? load(spec.slice(2)) : require(spec))
  new Function('require', 'module', 'exports', outputText)(req, mod, mod.exports)
  return (cache[name] = mod.exports)
}

const { profile, socials, contactInfo, contactCopy, navItems } = load('profile')
const { projects, projectCategories } = load('projects')
const { experience, education, achievements, leadership } = load('experience')
const { certifications } = load('certifications')
const { skillCategories } = load('skills')

const out = []
const h = (t) => out.push(`\n## ${t}\n`)
const li = (t) => out.push(`- ${t}`)
const v = (x) => (x === undefined || x === null || x === '' ? '—' : x)

out.push('# Content inventory\n')
out.push(`Generated from \`content/*.ts\`.\n`)

h('Counts')
const skillCount = skillCategories.reduce((n, c) => n + c.skills.length, 0)
for (const [k, n] of [
  ['Sections (nav anchors)', navItems.length],
  ['Projects', projects.length],
  ['Experience', experience.length],
  ['Education', education.length],
  ['Achievements', achievements.length],
  ['Leadership', leadership.length],
  ['Certifications', certifications.length],
  ['Skill groups', skillCategories.length],
  ['Skills', skillCount],
  ['Social links', socials.length],
  ['Contact items', contactInfo.length],
])
  li(`${k}: **${n}**`)

h('Sections and nav anchors')
for (const n of navItems) li(`${n.label} → \`#${n.id}\``)

h('Profile')
for (const [k, val] of Object.entries(profile)) li(`${k}: ${val}`)

h('About copy')
// Before the redesign the paragraphs are hard-coded in about.tsx; afterwards they live in content/profile.ts.
const aboutParas =
  load('profile').about ??
  [...fs.readFileSync(path.join(root, 'components/sections/about.tsx'), 'utf8').matchAll(/<RevealItem as="p">([\s\S]*?)<\/RevealItem>/g)].map((m) =>
    m[1].replace(/\{' '\}/g, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(),
  )
aboutParas.forEach((p, i) => li(`¶${i + 1}: ${p.replaceAll('**', '')}`))

h('Social links')
for (const s of socials) li(`${s.label}: ${s.href}`)

h('Contact details')
for (const c of contactInfo) li(`${c.label}: ${c.value} (${c.href})`)
li(`Badge: ${contactCopy.badge}`)
li(`Pitch: ${contactCopy.pitch}`)
li(`Tags: ${contactCopy.tags.join(' · ')}`)
li(`Preset messages: ${contactCopy.presetMessages.join(' | ')}`)

h('Projects')
for (const cat of projectCategories) {
  out.push(`\n### ${cat.label}\n`)
  for (const p of projects.filter((x) => x.category === cat.id)) {
    out.push(`- **${p.title}** — ${p.status}${p.location ? ` – ${p.location}` : ''} · ${p.period}`)
    out.push(`  - Tech: ${p.tech.join(', ')}`)
    out.push(`  - Team: ${v(p.team)}`)
    out.push(`  - Description: ${p.description}`)
    out.push(`  - Highlight: ${v(p.highlight)}`)
    out.push(`  - GitHub: ${v(p.github)}`)
    out.push(`  - Live: ${v(p.live)}`)
  }
}

h('Experience')
for (const x of experience) {
  out.push(`- **${x.role}** — ${x.company} · ${x.mode} · ${x.period}`)
  for (const pt of x.points) out.push(`  - ${pt}`)
  for (const l of x.links ?? []) out.push(`  - Link: ${l.label} → ${l.href}`)
}

h('Education')
for (const e of education) out.push(`- **${e.title}** — ${e.institution} · ${e.period} · ${e.details.join(' | ')}`)

h('Achievements')
for (const a of achievements) out.push(`- ${a.icon} **${a.title}** · ${a.date} — ${a.description}`)

h('Leadership')
for (const l of leadership) out.push(`- **${l.role}** · ${l.period} — ${l.description}`)

h('Certifications')
for (const c of certifications)
  out.push(`- **${c.title}** — ${c.issuer} · ${v(c.issued)}${c.hours ? ` · ${c.hours}` : ''} · credential: ${v(c.badge)} · image: ${v(c.image)}${c.pdf ? ` · pdf: ${c.pdf}` : ''}`)

h('Skills')
for (const c of skillCategories) li(`${c.title} (${c.skills.length}): ${c.skills.join(', ')}`)

console.log(out.join('\n'))
