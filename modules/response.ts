import type { Data } from '../types'
import { renderPage } from './'

export function responseJSON(data: NonNullable<unknown>, status: number = 200) {
  const res = Response.json(data, { status })
  res.headers.set('Access-Control-Allow-Origin', '*')
  res.headers.set('Access-Control-Allow-Methods', '*')
  res.headers.set('Access-Control-Allow-Headers', '*')
  res.headers.set('Access-Control-Expose-Headers', '*')
  return res
}

export function responseNotFound(message: string = 'Not Found.') {
  return responseJSON({ message, code: 404 }, 404)
}

export function responseIndex(data: Data) {
  return new Response(renderPage(data), {
    headers: { 'Content-Type': 'text/html' },
  })
}
