import React from 'react'
import Confetti from 'react-confetti'

var {useState} = React

export function Counter() {
  console.log('y1:')
  var [coords, setCoords] = useState(undefined)
  var [pieces, setPieces] = useState(0)
  var [count, setCount] = useState(0)
  console.log('y2:', coords, pieces, count)

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
    console.log('y3:', ev)
    setCount(count + 1)
    setPieces(pieces + 24)
    setCoords({x: ev.clientX, y: ev.clientY})
  }

  function onComplete() {
    setPieces(0)
  }
}
