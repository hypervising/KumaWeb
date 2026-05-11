type UpdatesHeroProps = {
  title: string
  subtitle: string
}

function UpdatesHero({ title, subtitle }: UpdatesHeroProps) {
  return (
    <section className='mt-12 flex flex-col items-center justify-center gap-4'>
      <h1 className='text-6xl font-semibold tracking-wide text-primaryText'>{title}</h1>
      <span className='text-xl text-secondaryText'>{subtitle}</span>
    </section>
  )
}

export default UpdatesHero
