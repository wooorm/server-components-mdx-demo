import {Suspense} from 'react'

export function Root(props) {
  var {response} = props
  console.log('z1:root', props)

  return (
    <Suspense fallback={null}>
      <Content />
    </Suspense>
  )

  function Content() {
    console.log('z1:0', response)
    var xxx = response.readRoot()
    console.log('z1:content', xxx)
    return xxx
  }
}
