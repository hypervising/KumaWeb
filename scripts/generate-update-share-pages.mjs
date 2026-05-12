import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const rootDir = process.cwd()
const srcUpdatesDir = path.join(rootDir, 'src', 'content', 'updates')
const distDir = path.join(rootDir, 'dist')
const distIndexPath = path.join(distDir, 'index.html')
const defaultOgImage = '/og-kuma.webp'

const indexHtml = await readFile(distIndexPath, 'utf8')
const fileNames = (await readdir(srcUpdatesDir)).filter(
  (fileName) => fileName.endsWith('.mdx') && fileName !== 'index.ts',
)

for (const fileName of fileNames) {
  const filePath = path.join(srcUpdatesDir, fileName)
  const source = await readFile(filePath, 'utf8')
  const slug = fileName.replace(/\.mdx$/, '')
  const title = extractSingleQuotedExport(source, 'title')
  const summary = extractSingleQuotedExport(source, 'summary')
  const description = buildDescription(source, summary)
  const pageTitle = `${title} | Kuma Updates`

  const html = applyMetadata(indexHtml, {
    title: pageTitle,
    description,
    ogTitle: pageTitle,
    ogDescription: description,
    ogImage: defaultOgImage,
  })

  const outputDir = path.join(distDir, 'updates', slug)
  await mkdir(outputDir, { recursive: true })
  await writeFile(path.join(outputDir, 'index.html'), html, 'utf8')
}

function extractSingleQuotedExport(source, exportName) {
  const sameLineMatch = source.match(
    new RegExp(`export const ${exportName} = '([^']*)'`),
  )

  if (sameLineMatch) {
    return sameLineMatch[1]
  }

  const multilineMatch = source.match(
    new RegExp(`export const ${exportName} =\\s*\\n\\s*'([^']*)'`),
  )

  if (multilineMatch) {
    return multilineMatch[1]
  }

  throw new Error(`Could not extract "${exportName}" export.`)
}

function buildDescription(source, summary) {
  const bulletLines = source
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => normalizeText(line.slice(2)))
    .filter(Boolean)

  const highlights = bulletLines.slice(0, 4)

  if (highlights.length === 0) {
    return clamp(summary, 280)
  }

  const bulletSummary = highlights.join(' • ')

  if (!summary) {
    return clamp(bulletSummary, 280)
  }

  return clamp(`${summary} Destaques: ${bulletSummary}`, 280)
}

function normalizeText(value) {
  return value
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function clamp(value, maxLength) {
  if (value.length <= maxLength) {
    return value
  }

  return `${value.slice(0, maxLength - 1).trimEnd()}…`
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function replaceMetaTag(html, pattern, replacement) {
  if (!pattern.test(html)) {
    throw new Error(`Missing expected meta tag: ${pattern}`)
  }

  return html.replace(pattern, replacement)
}

function applyMetadata(
  html,
  { title, description, ogTitle, ogDescription, ogImage },
) {
  const safeTitle = escapeHtml(title)
  const safeDescription = escapeHtml(description)
  const safeOgTitle = escapeHtml(ogTitle)
  const safeOgDescription = escapeHtml(ogDescription)
  const safeOgImage = escapeHtml(ogImage)

  let updatedHtml = html.replace(/<title>.*?<\/title>/, `<title>${safeTitle}</title>`)
  updatedHtml = replaceMetaTag(
    updatedHtml,
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${safeDescription}" />`,
  )
  updatedHtml = replaceMetaTag(
    updatedHtml,
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${safeOgTitle}" />`,
  )
  updatedHtml = replaceMetaTag(
    updatedHtml,
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${safeOgDescription}" />`,
  )
  updatedHtml = replaceMetaTag(
    updatedHtml,
    /<meta property="og:image" content="[^"]*" \/>/,
    `<meta property="og:image" content="${safeOgImage}" />`,
  )
  updatedHtml = replaceMetaTag(
    updatedHtml,
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${safeOgTitle}" />`,
  )
  updatedHtml = replaceMetaTag(
    updatedHtml,
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${safeOgDescription}" />`,
  )
  updatedHtml = replaceMetaTag(
    updatedHtml,
    /<meta name="twitter:image" content="[^"]*" \/>/,
    `<meta name="twitter:image" content="${safeOgImage}" />`,
  )

  return updatedHtml
}
