import {
  customType as customMySQLType,
  type MySqlCustomColumnBuilder,
  type ConvertCustomConfig,
} from 'drizzle-orm/mysql-core'
import { deserialize, type Id, serialize } from '../mod.js'

export const mysqlId = <const DatabaseName extends string, const Suffix extends string>(
  dbName: DatabaseName,
  options: { suffix: Suffix }
): MySqlCustomColumnBuilder<
  ConvertCustomConfig<DatabaseName, { data: Id<Suffix>; driverData: Uint8Array }>
> =>
  customMySQLType<{ data: Id<Suffix>; driverData: Uint8Array }>({
    dataType: () => 'BINARY(128)',
    toDriver: (id) => {
      return deserialize(id)
    },
    fromDriver: (uuid) => {
      return serialize(uuid, options.suffix)
    },
  })(dbName)
