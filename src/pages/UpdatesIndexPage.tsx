import { motion } from 'motion/react'

import PageShell from '../components/PageShell'
import UpdatesHero from '../components/UpdatesHero'
import UpdatesList from '../components/UpdatesList'
import { updates } from '../content/updates'

function UpdatesIndexPage() {
  return (
    <PageShell>
      <motion.div
        animate={{ opacity: 1 }}
        className='flex h-full w-full flex-col gap-60 pb-24'
        initial={{ opacity: 0 }}
        transition={{ duration: 0.26, ease: 'easeOut' }}
      >
        <UpdatesHero title='Updates' subtitle='As novidades no Kuma.' />
        <UpdatesList items={updates} />
      </motion.div>
    </PageShell>
  )
}

export default UpdatesIndexPage
