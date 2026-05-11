import UpdateCard from './UpdateCard'

type UpdateItem = {
  slug: string
  date: string
  title: string
  description: string
}

type UpdatesListProps = {
  items: UpdateItem[]
}

function UpdatesList({ items }: UpdatesListProps) {
  return (
    <section className='mx-auto flex w-full max-w-6xl flex-col px-6 pb-8 sm:px-10'>
      {items.map((item, index) => (
        <div key={`${item.date}-${item.title}`} className={index > 0 ? 'pt-10 md:pt-12' : ''}>
          {index > 0 && <div className='mb-10 h-px w-full bg-accent md:mb-12' />}
          <UpdateCard slug={item.slug} date={item.date} title={item.title} description={item.description} />
        </div>
      ))}
    </section>
  )
}

export default UpdatesList
