#!/usr/bin/env node
import path from 'path'
import url from 'url'
import {promises as fs} from 'fs'
import React from 'react'
import {renderToString} from 'react-dom/server.js'
import {createFromReadableStream} from 'react-server-dom-webpack'
import {bin2png} from 'bin2png'
import {Root} from '../src/root.client.js'

main()

async function main() {
  var buf = await fs.readFile('build/content.nljson')
  var data = JSON.parse(await fs.readFile('build/react-client-manifest.json'))
  var b64 = Buffer.from(await bin2png(buf)).toString('base64')
  var ignore = new Set(['index.client.js', 'root.client.js'])

  // We have to fake webpack for SSR.
  // Luckily only a few parts of its API need to be faked.
  var cache = {}
  global.__webpack_require__ = (id) => cache[id]
  global.__webpack_chunk_load__ = () => Promise.resolve()

  // Populate the cache with all client modules.
  await Promise.all(
    Object.keys(data)
      .filter((d) => !ignore.has(path.basename(d)))
      .map(async (d) => {
        // eslint-disable-next-line node/no-unsupported-features/es-syntax
        cache[data[d]['*'].id] = await import(url.fileURLToPath(d))
      })
  )

  // Create a browser stream that RSC needs for getting it’s content.
  var response = createFromReadableStream({
    getReader() {
      var enc = new TextEncoder()
      var done
      return {
        read() {
          if (done) return Promise.resolve({done})
          done = true
          return Promise.resolve({value: enc.encode(String(buf))})
        }
      }
    }
  })

  // Finally, actually perform the SSR, retrying if there is anything suspended.
  var result

  /* eslint-disable no-constant-condition, no-await-in-loop */
  while (true) {
    result = renderToString(React.createElement(Root, {response}))
    if (!result.includes('<!--$!-->')) break
    await sleep(64)
  }
  /* eslint-enable no-constant-condition, no-await-in-loop */

  await fs.writeFile(
    'build/index.html',
    `<!doctypehtml>
<html lang=en>
<meta charset=utf8>
<meta content=width=device-width,initial-scale=1 name=viewport>
<link href=index.css rel=stylesheet>
<title>React server components + MDX | wooorm.com</title>
<link href=https://wooorm.com/server-components-mdx-demo/ rel=canonical>
<meta content="small demo showing that RSC + MDX work together" name=description>
<meta content=mdx,md,jsx,xdm,facebook,react,server,client,component,rsc name=keywords>
<meta content="Titus Wormer" name=author>
<meta content="© 2021 Titus Wormer" name=copyright>
<meta content=#0366d6 name=theme-color>
<meta content=article property=og:type>
<meta content=wooorm.com property=og:site_name>
<meta content=https://wooorm.com/server-components-mdx-demo/ property=og:url>
<meta content="React server components + MDX" property=og:title>
<meta content="small demo showing that RSC + MDX work together" property=og:description>
<meta content=https://wooorm.com/server-components-mdx-demo/og.png property=og:image>
<meta content=2021-03-01T00:00:00.000Z property=article:published_time>
<meta content=2021-03-01T00:00:00.000Z property=article:modified_time>
<meta content=mdx property=article:tag>
<meta content=rsc property=article:tag>
<meta content=react property=article:tag>
<meta content=summary_large_image name=twitter:card>
<meta content=https://wooorm.com/server-components-mdx-demo/og.png name=twitter:image>
<meta content=@wooorm name=twitter:site>
<meta content=@wooorm name=twitter:creator>
<link href=data:image/x-icon;, rel="icon shortcut" type=image/x-icon>
<div id=root>${result}</div>
<script src=index.js></script>
<img style=display:none id=payload decoding=async loading=eager alt src="data:image/png;base64,${b64}">`
  )

  console.log('Prerendered content')
}

function sleep(ms) {
  return new Promise(executor)
  function executor(resolve) {
    setTimeout(resolve, ms)
  }
}
