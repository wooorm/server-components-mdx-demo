const theta = Math.PI * (3 - Math.sqrt(6))

export function Phyllotaxis(props) {
  const {size, step, length, radius} = props

  return (
    <svg
      width={size}
      height={size}
      viewBox={[0, 0, size, size].join(' ')}
      style={{
        color: 'var(--hl)',
        display: 'block',
        margin: '0 auto',
        height: 'auto'
      }}
    >
      {Array.from({length}).map((_, index) => {
        const r = step * Math.sqrt((index += 0.5))
        const a = theta * index
        return (
          <circle
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            fill="currentcolor"
            cx={size / 2 + r * Math.cos(a)}
            cy={size / 2 + r * Math.sin(a)}
            r={radius}
          />
        )
      })}
    </svg>
  )
}
