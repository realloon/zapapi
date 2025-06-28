import { file } from 'bun'

interface Schema {
  [key: string]: Array<{
    id: string | number
    [key: string]: unknown
  }>
}

/**
 * @todo Implement a file watcher to monitor changes in db.json
 */
export async function loadDatabase() {
  const db: Schema = await file('db.json').json()
  return new Map(Object.entries(db))
}
