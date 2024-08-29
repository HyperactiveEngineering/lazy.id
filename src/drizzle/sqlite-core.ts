import { customType as customSQLiteType } from 'drizzle-orm/sqlite-core'
import { deserialize, type Id, serialize } from '../mod.js'

export const sqliteId = <const DatabaseName extends string, const Suffix extends string>(
  dbName: DatabaseName,
  options: { suffix: Suffix }
) =>
  customSQLiteType<{ data: Id<Suffix>; driverData: Uint8Array }>({
    dataType: () => 'BLOB',
    toDriver: (id) => {
      return deserialize(id)
    },
    fromDriver: (uuid) => {
      return serialize(uuid, options.suffix)
    },
  })(dbName)
