import { serialize } from './serde.js'
import { uuidv7 } from './uuid.js'

export type Id<Suffix extends string | unknown = unknown> = Suffix extends string
  ? `${string}.${Suffix}`
  : `${string}.${string}`

export const id = <const Suffix extends string>(suffix: Suffix): Id<Suffix> => {
  const uuid = uuidv7()
  return serialize(uuid, suffix)
}
