import type { Data } from '../types'
import { renderPage } from './'

export function responseJSON(
  data: NonNullable<unknown>,
  status: number = 200
) {
  return Response.json(data, { status })
}

export function responseNotFound(message: string = 'Not Found.') {
  return responseJSON({ message, code: 404 }, 404)
}

export function responseIndex(data: Data) {
  return new Response(renderPage(data), {
    headers: { 'Content-Type': 'text/html' },
  })
}
