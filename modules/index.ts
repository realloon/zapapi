export function responseJSON(data: NonNullable<unknown>, status: number) {
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
    status: status,
  })
}

export function responseNotFound(message?: string) {
  return responseJSON({ message: message ?? 'Not Found.', code: 404 }, 404)
}