import db from '@/db/client'
import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello from Hono!'
  })
})

app.get('/matches', async (context) => {
  const matches = await db.query.matches.findMany({
    with: {
      feedbacks: true
    }
  })
  return context.json({
    matches: matches
  })
  }
)

export const GET = handle(app)
