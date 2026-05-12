import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Link, Navigate, useParams } from 'react-router-dom'

import AuthorList from '../components/AuthorList'
import PageShell from '../components/PageShell'
import { getUpdateBySlug } from '../content/updates'

function UpdateDetailPage() {
  const { slug } = useParams()
  const update = slug ? getUpdateBySlug(slug) : undefined
  const [expandedImage, setExpandedImage] = useState<{ src: string; alt: string } | null>(null)

  if (!update) {
    return <Navigate to='/' replace />
  }

  const { Content } = update

  useEffect(() => {
    if (!expandedImage) {
      return
    }

    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setExpandedImage(null)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [expandedImage])

  return (
    <PageShell>
      <motion.article
        animate={{ opacity: 1, y: 0 }}
        className='mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-16 text-primaryText sm:px-10'
        initial={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className='flex flex-col gap-4 border-b border-accent/60 pb-8'>
          <Link
            className='text-sm uppercase text-secondaryText transition-colors hover:text-primaryText'
            to='/updates'
          >
            Voltar
          </Link>
          <span className='text-base text-secondaryText'>{update.date}</span>
          <h1 className='text-5xl font-semibold tracking-wide'>{update.title}</h1>
          <p className='max-w-3xl text-lg text-secondaryText'>{update.description}</p>
          <AuthorList authors={update.authors} />
        </div>

        <div
          className='mdx-content max-w-none text-lg leading-8 text-primaryText'
          onClick={(event) => {
            if (!(event.target instanceof HTMLImageElement)) {
              return
            }

            setExpandedImage({
              src: event.target.currentSrc || event.target.src,
              alt: event.target.alt || 'Imagem do update',
            })
          }}
        >
          <Content />
        </div>
      </motion.article>

      {expandedImage ? (
        <button
          aria-label='Fechar imagem expandida'
          className='fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/80 p-4'
          onClick={() => setExpandedImage(null)}
          type='button'
        >
          <img
            alt={expandedImage.alt}
            className='max-h-[92vh] max-w-[92vw] rounded-xl shadow-2xl'
            onClick={(event) => event.stopPropagation()}
            src={expandedImage.src}
          />
        </button>
      ) : null}
    </PageShell>
  )
}

export default UpdateDetailPage
