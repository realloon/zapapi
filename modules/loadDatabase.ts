import { file } from 'bun'
import { Schema } from '../types'

export const DATABASE = 'db.json'

let initialized = false
const data = new Map<string, Schema[string]>()

export async function loadDatabase() {
  try {
    const db: Schema = await file(DATABASE).json()

    data.clear()
    Object.entries(db).forEach(([key, value]) => data.set(key, value))

    if (initialized) {
      console.log(`\x1b[90mReload data from ${DATABASE}\x1b[0m`)
    } else {
      initialized = true
    }
  } catch (error) {
    console.warn(`\x1b[31mFailed to parse JSON from ${DATABASE}\x1b[0m`)
  }

  return data
}
