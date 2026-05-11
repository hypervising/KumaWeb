import type { ComponentType } from 'react'

type UpdateModule = {
  default: ComponentType
  title: string
  date: string
  summary: string
  authors?: {
    name: string
    avatar?: string
  }[]
}

export type UpdateEntry = {
  slug: string
  title: string
  date: string
  description: string
  authors: {
    name: string
    avatar?: string
  }[]
  Content: ComponentType
}

const updateModules = import.meta.glob<UpdateModule>('./*.mdx', { eager: true })

export const updates: UpdateEntry[] = Object.entries(updateModules)
  .map(([path, module]) => ({
    slug: path.split('/').pop()!.replace(/\.mdx$/, ''),
    title: module.title,
    date: module.date,
    description: module.summary,
    authors: module.authors ?? [],
    Content: module.default,
  }))
  .sort((left, right) => right.date.localeCompare(left.date))

export function getUpdateBySlug(slug: string) {
  return updates.find((update) => update.slug === slug)
}
