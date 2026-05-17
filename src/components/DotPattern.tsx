import { useId } from 'react'

type DotPatternProps = {
  className?: string
  dotSize?: number
  gap?: number
  dotOpacity?: number
  fadeMask?: string
  offsetY?: number
}

function DotPattern({
  className = '',
  dotSize = 8,
  gap = 12,
  dotOpacity = 0.2,
  fadeMask = 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.25) 35%, rgba(0, 0, 0, 0.15) 60%, rgba(0, 0, 0, 0) 85%)',
  offsetY = 0
}: DotPatternProps) {
  const patternId = useId()
  const tileSize = dotSize + gap
  const radius = dotSize / 2
  const center = tileSize / 2
  const clampedOpacity = Math.min(Math.max(dotOpacity, 0), 1)

  return (
    <div
      aria-hidden='true'
      className={className}
      style={{
        maskImage: fadeMask,
        WebkitMaskImage: fadeMask,
      }}
    >
      <svg className='block h-full w-full' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
        <defs>
          <pattern
            id={patternId}
            x='0'
            y={offsetY}
            width={tileSize}
            height={tileSize}
            patternUnits='userSpaceOnUse'
          >
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill='currentColor'
              fillOpacity={clampedOpacity}
            />
          </pattern>
        </defs>
        <rect x='0' y='0' width='100%' height='100%' fill={`url(#${patternId})`} />
      </svg>
    </div>
  )
}

export default DotPattern
