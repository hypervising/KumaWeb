import { motion } from 'motion/react'
import NumberFlow from '@number-flow/react'
import { useEffect, useState } from 'react'

import { DISCORD_URL } from '../config/site'
import PageShell from '../components/PageShell'

const COUNTDOWN_TARGET = {
  iso: '2026-04-02T20:00:00+01:00',
  label: '2 de Abril de 2026 às 20:00',
}

type CountdownParts = {
  days: number
  hours: number
  minutes: number
  seconds: number
  expired: boolean
}

function getCountdownParts(targetIso: string): CountdownParts {
  const distance = new Date(targetIso).getTime() - Date.now()

  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
  }

  const days = Math.floor(distance / 86_400_000)
  const hours = Math.floor((distance % 86_400_000) / 3_600_000)
  const minutes = Math.floor((distance % 3_600_000) / 60_000)
  const seconds = Math.floor((distance % 60_000) / 1_000)

  return { days, hours, minutes, seconds, expired: false }
}

function CountdownUnit({
  label,
  value,
  minDigits = 2,
}: {
  label: string
  value: number
  minDigits?: number
}) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className='relative overflow-hidden rounded-[0.95rem] border border-accent/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] px-4 py-4 shadow-[0_16px_48px_rgba(0,0,0,0.28)]'
      initial={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primaryText/16 to-transparent' />
      <div className='absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-primaryText/10' />
      <div className='absolute left-0 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent bg-primary' />
      <div className='absolute right-0 top-1/2 h-2.5 w-2.5 translate-x-1/2 -translate-y-1/2 rounded-full border border-accent bg-primary' />

      <div className='relative z-10 flex flex-col gap-3'>
        <div className='text-sm tracking-[0.28em] text-secondaryText'>
          {label}
        </div>
        <div className='text-4xl font-semibold leading-none tracking-[-0.06em] text-primaryText sm:text-6xl'>
          <NumberFlow
            className='tabular-nums'
            format={{ minimumIntegerDigits: minDigits, useGrouping: false }}
            spinTiming={{ duration: 700, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            transformTiming={{ duration: 700, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            value={value}
            willChange
          />
        </div>
      </div>
    </motion.div>
  )
}

function CountdownPage() {
  const [countdown, setCountdown] = useState(() => getCountdownParts(COUNTDOWN_TARGET.iso))

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCountdown(getCountdownParts(COUNTDOWN_TARGET.iso))
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <PageShell>
      <section className='relative mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl flex-col justify-center px-6 py-20 sm:px-10'>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className='absolute left-[-6rem] top-24 h-56 w-56 rounded-full bg-primaryText/[0.03] blur-3xl'
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className='relative z-10 flex max-w-3xl flex-col gap-6'
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className='max-w-4xl text-5xl font-semibold leading-none tracking-[-0.04em] text-primaryText sm:text-7xl'>
            Estamos a cozinhar.
          </h1>
          <p className='max-w-2xl text-lg leading-8 text-secondaryText'>
            Estamos a preparar algo grande para o Kuma, fiquem atentos para o lançamento a {COUNTDOWN_TARGET.label}!
          </p>
          <a
            className='inline-flex w-fit items-center gap-3 rounded-full border border-accent/90 bg-secondary/45 px-4 py-2 text-sm text-primaryText transition-colors hover:bg-secondary/70'
            href={DISCORD_URL}
            rel='noreferrer'
            target='_blank'
          >
            <svg aria-hidden='true' className='h-4 w-4 shrink-0' viewBox='0 0 24 24' fill='currentColor'>
              <path d='M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.078.037c-.211.375-.444.864-.608 1.249a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.249.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.12 14.12 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.1.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.04.107c.36.698.771 1.364 1.225 1.994a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .031-.055c.5-5.177-.838-9.674-3.548-13.66a.061.061 0 0 0-.031-.03ZM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.211 0 2.176 1.095 2.157 2.418 0 1.334-.955 2.419-2.157 2.419Zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.211 0 2.176 1.095 2.157 2.418 0 1.334-.946 2.419-2.157 2.419Z' />
            </svg>
            Entrar no Discord
          </a>
        </motion.div>

        {countdown.expired ? (
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className='relative z-10 mt-14 w-full rounded-[2rem] border border-primaryText/15 bg-secondary/50 px-8 py-12 text-center'
            initial={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className='text-xs uppercase tracking-[0.3em] text-secondaryText'>agora ao vivo</div>
            <div className='mt-4 text-5xl font-semibold tracking-[-0.04em] text-primaryText'>A espera acabou.</div>
          </motion.div>
        ) : (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className='relative z-10 mt-12 grid grid-cols-2 gap-3 md:grid-cols-4'
            initial={{ opacity: 0, y: 24 }}
            transition={{ delay: 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <CountdownUnit label='dias' minDigits={3} value={countdown.days} />
            <CountdownUnit label='horas' value={countdown.hours} />
            <CountdownUnit label='minutos' value={countdown.minutes} />
            <CountdownUnit label='segundos' value={countdown.seconds} />
          </motion.div>
        )}
      </section>
    </PageShell>
  )
}

export default CountdownPage
