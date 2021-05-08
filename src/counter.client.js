import React from 'react'
import Confetti from 'react-confetti'

const {useState} = React

export function Counter() {
  const [coords, setCoords] = useState(undefined)
  const [pieces, setPieces] = useState(0)
  const [count, setCount] = useState(0)

  return (
    <>
      You{' '}
      <button type="button" onClick={onClick}>
        clicked me
      </button>{' '}
      exactly {count} times
      {pieces ? (
        <Confetti
          colors={['#0366d6']}
          numberOfPieces={pieces}
          confettiSource={coords}
          recycle={false}
          onConfettiComplete={onComplete}
        />
      ) : null}
    </>
  )

  function onClick(ev) {
    setCount(count + 1)
    setPieces(pieces + 24)
    setCoords({x: ev.clientX, y: ev.clientY})
  }

  function onComplete() {
    setPieces(0)
  }
}
