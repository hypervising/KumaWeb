type Author = {
  name: string
  avatar?: string
}

type AuthorListProps = {
  authors: Author[]
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

function AuthorList({ authors }: AuthorListProps) {
  if (authors.length === 0) {
    return null
  }

  return (
    <div className='flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-sm text-secondaryText'>
      {authors.map((author) => (
        <div key={author.name} className='flex items-center gap-2'>
          {author.avatar ? (
            <img alt={author.name} className='h-6 w-6 rounded-full object-cover' src={author.avatar} />
          ) : (
            <div className='flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[10px] font-semibold tracking-wide text-primaryText'>
              {getInitials(author.name)}
            </div>
          )}
          <span>{author.name}</span>
        </div>
      ))}
    </div>
  )
}

export default AuthorList
