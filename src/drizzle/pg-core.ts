import { customType as customPGType } from 'drizzle-orm/pg-core'
import { deserialize, type Id, serialize } from '../mod.js'

export const pgId = <const DatabaseName extends string, const Suffix extends string>(
  dbName: DatabaseName,
  options: { suffix: Suffix }
) =>
  customPGType<{ data: Id<Suffix>; driverData: Uint8Array }>({
    dataType: () => 'BYTEA',
    toDriver: (id) => {
      return deserialize(id)
    },
    fromDriver: (uuid) => {
      return serialize(uuid, options.suffix)
    },
  })(dbName)
