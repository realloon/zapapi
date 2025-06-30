export interface Schema {
  [key: string]: Array<{
    [key: string]: unknown
    id: string | number
  }>
}

export type Data = Map<string, unknown[]>
