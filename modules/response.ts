import type { Data } from '../types'
import { renderPage } from './'

export class CORSResponse extends Response {
  constructor() {
    super()
    this.headers.set('Access-Control-Allow-Origin', '*')
    this.headers.set('Access-Control-Allow-Methods', '*')
    this.headers.set('Access-Control-Allow-Headers', '*')
    this.headers.set('Access-Control-Expose-Headers', '*')
  }
}

export function responseJSON(
  data: NonNullable<unknown>,
  status: number = 200
) {
  return CORSResponse.json(data, { status })
}

export function responseNotFound(message: string = 'Not Found.') {
  return responseJSON({ message, code: 404 }, 404)
}

export function responseIndex(data: Data) {
  return new Response(renderPage(data), {
    headers: { 'Content-Type': 'text/html' },
  })
}
