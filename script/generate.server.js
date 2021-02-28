#!/usr/bin/env node
import fs from 'fs'
import React from 'react'
import {pipeToNodeWritable} from 'react-server-dom-webpack/writer'
import Content from '../src/content.server.mdx'

var manifest = fs.readFileSync('build/react-client-manifest.json')

pipeToNodeWritable(
  React.createElement(Content),
  fs.createWriteStream('build/content.nljson'),
  JSON.parse(manifest)
)

process.on('exit', () => console.log('Generated content'))
