declare module '*.mdx' {
  import type { ComponentType } from 'react'

  const MDXComponent: ComponentType

  export type UpdateAuthor = {
    name: string
    avatar?: string
  }

  export default MDXComponent
  export const title: string
  export const date: string
  export const summary: string
  export const authors: UpdateAuthor[]
}
