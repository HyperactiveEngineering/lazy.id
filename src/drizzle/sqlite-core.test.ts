import { default as Database } from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { sql } from 'drizzle-orm/sql'
import { sqliteTable } from 'drizzle-orm/sqlite-core'
import { beforeAll, describe, expect, it } from 'vitest'
import { sqliteId } from './sqlite-core.js'
import { id } from '../mod.js'

describe('drizzle', () => {
  describe('sqlite', () => {
    const database = new Database(':memory:')
    const db = drizzle(database, { logger: false })

    const User = sqliteTable('user', {
      id: sqliteId('id', { suffix: 'user' }),
    })

    beforeAll(() => {
      db.run(sql`CREATE TABLE user (id BLOB PRIMARY KEY)`)

      db.insert(User)
        .values({ id: id('user') })
        .run()
    })

    it('gives us an id as a string', () => {
      expect(db.select({ id: User.id }).from(User).all()).toEqual([
        {
          id: expect.stringContaining('.user'),
        },
      ])
    })

    it('stores the id as a blob', () => {
      expect(db.all(sql`SELECT * FROM user`)).toEqual([
        {
          id: expect.any(Uint8Array),
        },
      ])
    })
  })
})
