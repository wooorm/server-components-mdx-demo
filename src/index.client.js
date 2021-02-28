import {unstable_createRoot} from 'react-dom'
import {createFromFetch} from 'react-server-dom-webpack'
import {png2bin} from 'png2bin'
import {Root} from './root.client.js'

window.addEventListener('load', main)

async function main() {
  console.log('x1:')
  var $root = document.querySelector('#root')
  console.log('x2:', $root)
  var $payload = document.querySelector('#payload')
  console.log('x3:', $payload)
  var url = URL.createObjectURL(new Blob([await png2bin($payload)]))
  console.log('x4:', url)
  var root = unstable_createRoot($root, {hydrate: Boolean($root.innerHTML)})
  console.log('x5:', root)
  var response = createFromFetch(fetch(url))
  console.log('x6:', response)
  root.render(<Root response={response} />)
}
