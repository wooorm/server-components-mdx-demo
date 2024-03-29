import {hydrateRoot} from 'react-dom'
import {createFromFetch} from 'react-server-dom-webpack'
import {png2bin} from 'png2bin'
import {Root} from './root.client.js'

window.addEventListener('DOMContentLoaded', main)

async function main() {
  const $root = document.querySelector('#root')
  const $payload = document.querySelector('#payload')
  const url = URL.createObjectURL(new Blob([await png2bin($payload)]))

  hydrateRoot($root, <Root response={createFromFetch(fetch(url))} />)

  // Show that image.
  $payload.style = 'display:block'
}
