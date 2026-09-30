import {
  siApache,
  siChartdotjs,
  siCplusplus,
  siCss,
  siDocker,
  siFastapi,
  siFirebase,
  siGithub,
  siJavascript,
  siMariadb,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siNumpy,
  siOpencv,
  siPandas,
  siPhp,
  siPostgresql,
  siPython,
  siReact,
  siScikitlearn,
  siStreamlit,
  siSupabase,
  siTailwindcss,
  siTensorflow,
  siTypescript,
  siVercel,
  type SimpleIcon,
} from 'simple-icons'

export type SkillIcon = { path: string; color: string } | { monogram: string }

/** Relative luminance of a hex colour, 0–1. */
function luminance(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** Brand colour on hover, unless it would vanish on the near-black background. */
const icon = (si: SimpleIcon): SkillIcon => ({
  path: si.path,
  color: luminance(si.hex) > 0.08 ? `#${si.hex}` : 'var(--foreground)',
})

// Generic database cylinder — "SQL" is a language, not one vendor's logo.
const database: SkillIcon = {
  path: 'M12 2C7.03 2 3 3.57 3 5.5v13C3 20.43 7.03 22 12 22s9-1.57 9-3.5v-13C21 3.57 16.97 2 12 2Zm0 2c4.42 0 7 1.3 7 1.5S16.42 7 12 7 5 5.7 5 5.5 7.58 4 12 4ZM5 8.1C6.6 8.68 9.2 9 12 9s5.4-.32 7-.9v3.4c0 .2-2.58 1.5-7 1.5s-7-1.3-7-1.5V8.1Zm0 6C6.6 14.68 9.2 15 12 15s5.4-.32 7-.9v4.4c0 .2-2.58 1.5-7 1.5s-7-1.3-7-1.5v-4.4Z',
  color: 'var(--accent)',
}

/**
 * Logos where simple-icons has one; a monogram where the brand is not in the set
 * (AWS, Microsoft marks, Recharts, XGBoost, …) or the skill is a technique, not a product.
 */
export const skillIcons: Record<string, SkillIcon> = {
  Python: icon(siPython),
  JavaScript: icon(siJavascript),
  TypeScript: icon(siTypescript),
  SQL: database,
  PHP: icon(siPhp),
  'C++': icon(siCplusplus),
  'HTML/CSS': icon(siCss),
  React: icon(siReact),
  'Next.js': icon(siNextdotjs),
  'Tailwind CSS': icon(siTailwindcss),
  'Chart.js': icon(siChartdotjs),
  Recharts: { monogram: 'Rc' },
  'Node.js': icon(siNodedotjs),
  FastAPI: icon(siFastapi),
  'REST APIs': { monogram: '{ }' },
  PostgreSQL: icon(siPostgresql),
  Supabase: icon(siSupabase),
  MySQL: icon(siMysql),
  MariaDB: icon(siMariadb),
  MongoDB: icon(siMongodb),
  Firebase: icon(siFirebase),
  AWS: { monogram: 'AWS' },
  Docker: icon(siDocker),
  Vercel: icon(siVercel),
  Apache: icon(siApache),
  'Git & GitHub': icon(siGithub),
  TensorFlow: icon(siTensorflow),
  'Scikit-learn': icon(siScikitlearn),
  OpenCV: icon(siOpencv),
  Pandas: icon(siPandas),
  NumPy: icon(siNumpy),
  'Transfer Learning': { monogram: 'TL' },
  'Grad-CAM': { monogram: 'GC' },
  SARIMA: { monogram: 'SA' },
  Prophet: { monogram: 'Pr' },
  XGBoost: { monogram: 'XG' },
  'Anomaly Detection': { monogram: 'AD' },
  'K-Means / PCA': { monogram: 'KM' },
  Streamlit: icon(siStreamlit),
  'Power BI': { monogram: 'BI' },
}
