import { file } from 'bun'

interface Schema {
  [key: string]: Array<{
    id: string | number
    [key: string]: unknown
  }>
}

export async function loadDatabase() {
  const db: Schema = await file('db.json').json()
  return new Map(Object.entries(db))
}
