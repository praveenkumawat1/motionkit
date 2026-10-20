import express from 'express'
import { catalog, plans } from './catalog.js'

const app = express()
const port = Number(process.env.PORT) || 4000
const startedAt = new Date().toISOString()

app.disable('x-powered-by')
app.use(express.json({ limit: '16kb' }))
app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (request.method === 'OPTIONS') return response.sendStatus(204)
  next()
})

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'motionkit-api', startedAt, uptimeSeconds: Math.round(process.uptime()) })
})

app.get('/api/components', (request, response) => {
  const includePremium = request.query.premium === 'true'
  const category = typeof request.query.category === 'string' ? request.query.category.toLowerCase() : ''
  const components = catalog.filter((component) => (includePremium || !component.premium) && (!category || component.category.toLowerCase() === category))
  response.json({ count: components.length, premiumIncluded: includePremium, components })
})

app.get('/api/components/:slug', (request, response) => {
  const component = catalog.find((item) => item.slug === request.params.slug)
  if (!component) return response.status(404).json({ error: 'Component not found', code: 'COMPONENT_NOT_FOUND' })
  if (component.premium && request.query.entitled !== 'true') {
    return response.status(403).json({ error: 'Premium entitlement required', code: 'PREMIUM_REQUIRED', component })
  }
  response.json({ component })
})

app.get('/api/plans', (_request, response) => {
  response.json({ currency: 'USD', plans })
})

app.post('/api/entitlements/preview', (request, response) => {
  const { planId } = request.body || {}
  const plan = plans.find((item) => item.id === planId)
  if (!plan) return response.status(400).json({ error: 'A valid planId is required', code: 'INVALID_PLAN' })
  response.json({
    mode: 'demo',
    message: 'Demo entitlement only. Connect your payment provider before granting production access.',
    plan,
    entitledComponentCount: plan.componentLimit,
  })
})

app.use((_request, response) => response.status(404).json({ error: 'Route not found', code: 'ROUTE_NOT_FOUND' }))

app.listen(port, () => {
  console.log(`MotionKit API listening on http://localhost:${port}`)
})
