import { parseArgs } from 'util'

export function loadConfig() {
  const { values } = parseArgs({
    args: process.argv,
    options: {
      port: { type: 'string' },
      p: { type: 'string' },
      database: { type: 'string' },
      db: { type: 'string' },
    },
    strict: true,
    allowPositionals: true,
  })

  const port = values.port ?? values.p ?? '9000'
  const database = values.database ?? values.db ?? 'db.json'

  return { port, database }
}
