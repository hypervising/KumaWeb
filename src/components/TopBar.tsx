import { Link } from 'react-router-dom'

import KumaLogo from './KumaLogo'

function TopBar() {
  return (
    <header className='w-full border-b border-accent/70 bg-secondary/85 backdrop-blur-sm'>
      <div className='mx-auto grid h-12 w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6'>
        <div />

        <Link aria-label='Kuma' className='justify-self-center text-primaryText transition-opacity hover:opacity-80' to='/'>
          <KumaLogo className='h-6 w-auto' />
        </Link>
      </div>
    </header>
  )
}

export default TopBar
