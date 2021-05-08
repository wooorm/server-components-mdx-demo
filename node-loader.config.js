import * as xdm from 'xdm/esm-loader.js'
import * as babel from '@node-loader/babel'
import * as serverDomWebpack from 'react-server-dom-webpack/node-loader'

const loader = {loaders: [serverDomWebpack, xdm, babel]}

export default loader
