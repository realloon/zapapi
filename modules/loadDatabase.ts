import { file } from 'bun'
import { Schema } from '../types'

export const DATABASE = 'db.json'

const data = new Map<string, Schema[string]>()

/**
 * @todo error handle
 */
export async function loadDatabase() {
  const db: Schema = await file(DATABASE).json()

  data.clear()

  Object.entries(db).forEach(([key, value]) => data.set(key, value))

  return data
}
