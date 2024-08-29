import {
  customType as customSQLiteType,
  type ConvertCustomConfig,
  type SQLiteCustomColumnBuilder,
} from 'drizzle-orm/sqlite-core'
import { deserialize, type Id, serialize } from '../mod.js'

export const sqliteId = <const DatabaseName extends string, const Suffix extends string>(
  dbName: DatabaseName,
  options: { suffix: Suffix }
): SQLiteCustomColumnBuilder<
  ConvertCustomConfig<DatabaseName, { data: Id<Suffix>; driverData: Uint8Array }>
> =>
  customSQLiteType<{ data: Id<Suffix>; driverData: Uint8Array }>({
    dataType: () => 'BLOB',
    toDriver: (id) => {
      return deserialize(id)
    },
    fromDriver: (uuid) => {
      return serialize(uuid, options.suffix)
    },
  })(dbName)
