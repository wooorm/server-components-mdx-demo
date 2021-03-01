import {unstable_createRoot} from 'react-dom'
import {createFromFetch} from 'react-server-dom-webpack'
import {png2bin} from 'png2bin'
import {Root} from './root.client.js'

window.addEventListener('DOMContentLoaded', main)

async function main() {
  var $root = document.querySelector('#root')
  var $payload = document.querySelector('#payload')
  var url = URL.createObjectURL(new Blob([await png2bin($payload)]))
  var root = unstable_createRoot($root, {hydrate: Boolean($root.innerHTML)})

  root.render(<Root response={createFromFetch(fetch(url))} />)

  // Show that image.
  $payload.style = 'display:block'
}
