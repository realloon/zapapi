import { file } from 'bun'

interface Schema {
  [key: string]: Array<{
    [key: string]: unknown
    id: string | number
  }>
}

export const DATABASE = 'db.json'

const data = new Map<string, Schema[string]>()

export async function loadDatabase() {
  const db: Schema = await file(DATABASE).json()

  data.clear()

  Object.entries(db).forEach(([key, value]) => data.set(key, value))

  return data
}
