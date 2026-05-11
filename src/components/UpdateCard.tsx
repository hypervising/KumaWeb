import { motion } from 'motion/react'
import { Link } from 'react-router-dom'

type UpdateCardProps = {
  slug: string
  date: string
  title: string
  description: string
}

function UpdateCard({ slug, date, title, description }: UpdateCardProps) {
  return (
    <motion.article
      className='grid gap-5 text-secondaryText md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10'
      initial={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.35 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className='pt-1 text-sm uppercase tracking-[0.18em] text-secondaryText md:text-base'>
        {date}
      </div>
      <div className='flex min-w-0 flex-col gap-3'>
        <h2 className='text-3xl font-semibold text-primaryText'>
          <Link to={`/updates/${slug}`}>
            {title}
          </Link>
        </h2>
        <p className='text-lg text-secondaryText'>{description}</p>
      </div>
    </motion.article>
  )
}

export default UpdateCard
