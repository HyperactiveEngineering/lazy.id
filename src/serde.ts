import { fromBase64url, toBase64url } from './base64url.js'
import type { Id } from './id.js'

export const serialize = <const Suffix extends string>(
  uuid: Uint8Array,
  suffix: Suffix
): Id<Suffix> => {
  return `${toBase64url(uuid)}.${suffix}` as Id<Suffix>
}

const BYTE_TO_HEX = Array.from({ length: 256 }, (_, index) => index.toString(16).padStart(2, '0'))

export const serializeAsUuid = (uuid: Uint8Array): string => {
  return (
    BYTE_TO_HEX[uuid[0]!]! +
    BYTE_TO_HEX[uuid[1]!]! +
    BYTE_TO_HEX[uuid[2]!]! +
    BYTE_TO_HEX[uuid[3]!]! +
    '-' +
    BYTE_TO_HEX[uuid[4]!]! +
    BYTE_TO_HEX[uuid[5]!]! +
    '-' +
    BYTE_TO_HEX[uuid[6]!]! +
    BYTE_TO_HEX[uuid[7]!]! +
    '-' +
    BYTE_TO_HEX[uuid[8]!]! +
    BYTE_TO_HEX[uuid[9]!]! +
    '-' +
    BYTE_TO_HEX[uuid[10]!]! +
    BYTE_TO_HEX[uuid[11]!]! +
    BYTE_TO_HEX[uuid[12]!]! +
    BYTE_TO_HEX[uuid[13]!]! +
    BYTE_TO_HEX[uuid[14]!]! +
    BYTE_TO_HEX[uuid[15]!]!
  )
}

export const deserialize = (id: Id): Uint8Array => {
  return fromBase64url(id.substring(0, 22))
}
