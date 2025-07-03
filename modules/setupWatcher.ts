import { watch } from 'node:fs'

export function setupWatcher(target: string, callback: () => void) {
  const watcher = watch(process.cwd(), (_, filename) => {
    if (filename !== target) return
    callback()
  })

  process.on('SIGINT', () => {
    watcher.close()
    process.exit(0)
  })
}