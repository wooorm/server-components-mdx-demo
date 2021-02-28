import {Suspense} from 'react'

export function Root(props) {
  var {response} = props

  return (
    <Suspense fallback={null}>
      <Content />
    </Suspense>
  )

  function Content() {
    return response.readRoot()
  }
}
