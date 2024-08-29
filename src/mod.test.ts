vi.useFakeTimers({
  now: 1700000000000,
})

import { describe, it, expect, vi } from 'vitest'
import { id as lid, deserialize, serializeAsUuid } from './mod.js'

describe('id', () => {
  it('generates an id', () => {
    expect(lid('test')).match(/^[a-zA-Z0-9_-]{22}.test$/)
  })

  it('generates an id with a timestamp as the first 48 bits', () => {
    const id = lid('test')
    const buffer = deserialize(id)
    const uuid = serializeAsUuid(buffer)
    expect(uuid).match(/^018bcfe5-6800/)
  })

  it('generates an id that is a valid uuid v7', () => {
    const id = lid('test')
    const buffer = deserialize(id)
    const uuid = serializeAsUuid(buffer)
    expect(uuid).match(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  })
})
