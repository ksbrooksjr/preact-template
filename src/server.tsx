import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { html } from './utils/renderUtils.js'
import render from 'preact-render-to-string'
import Counter from './pages/counter.js'
import React from 'react'
import { Router } from 'wouter-preact'

const app = new Hono()

app.get('/counter/:initialValue', c => {
  const count = c.req.param('initialValue')

  return c.html(
    html({
      title: 'Preact Demo',
      description: 'This is a demo of a Preact web component.',
      scriptName: 'counter.js',
      html: render(
        <Router ssrPath={`/counter/${count}`}>
          <Counter />
        </Router>
      ),
      initialState: {},
    })
  )
})

app.use('/public/*', serveStatic({ root: './' }))

serve({ fetch: app.fetch, port: 3000 })

console.log('listening on port 3000')
