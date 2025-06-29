export * from './loadDatabase'
export * from './renderPage'
export * from './matchByQuery'

export function responseJSON(
  data: NonNullable<unknown>,
  status: number = 200
) {
  return Response.json(data, {
    status: status,
  })
}

export function responseNotFound(message: string = 'Not Found.') {
  return responseJSON({ message, code: 404 }, 404)
}
