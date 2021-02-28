import * as xdm from 'xdm/esm-loader.js'
import * as babel from '@node-loader/babel'
import * as serverDomWebpack from 'react-server-dom-webpack/node-loader'

export default {loaders: [serverDomWebpack, xdm, babel]}
