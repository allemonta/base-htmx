import { defineRelations } from "drizzle-orm"
import { usersTable } from "./users"

export const relations = defineRelations({ usersTable }, (r) => ({
  usersTable: {},
}))
