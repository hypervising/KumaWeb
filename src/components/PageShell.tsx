import type { ReactNode } from 'react'

import DotPattern from './DotPattern'
import TopBar from './TopBar'

type PageShellProps = {
  children: ReactNode
}

function PageShell({ children }: PageShellProps) {
  return (
    <div className='relative min-h-screen w-full overflow-hidden bg-primary'>
      <DotPattern className='pointer-events-none absolute inset-x-0 top-12 bottom-0 z-0 text-accent' dotSize={2} gap={12} dotOpacity={0.7} />

      <div className='relative z-10 w-full'>
        <TopBar />
        {children}
      </div>
    </div>
  )
}

export default PageShell
