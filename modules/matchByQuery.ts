export function matchByQuery(
  item: Record<string, unknown>,
  query: URLSearchParams
): boolean {
  for (const key of query.keys()) {
    const values = query.getAll(key)
    const target = item[key]

    if (Array.isArray(target)) {
      if (target.length === 0) return false
      const hasMatch = values.some(value => target.includes(value))
      if (!hasMatch) return false
    } else {
      const match =
        Object.hasOwn(item, key) && values.includes(String(target)) // item should have the key
      if (!match) return false
    }
  }

  return true
}
