import { getRandomValues } from './get-random-values.js'

export const uuidv7 = (): Uint8Array => {
  const uuid = new Uint8Array(16)

  getRandomValues(uuid)

  const timestamp = Date.now()

  uuid[0] = timestamp / 0x10000000000
  uuid[1] = timestamp / 0x100000000
  uuid[2] = timestamp / 0x1000000
  uuid[3] = timestamp / 0x10000
  uuid[4] = timestamp / 0x100
  uuid[5] = timestamp

  uuid[6] = 0b01110000 | (uuid[6]! & 0x0f)

  uuid[8] = 0b10000000 | (uuid[8]! & 0x3f)

  return uuid
}
