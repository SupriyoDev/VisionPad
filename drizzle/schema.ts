import {
  AnyPgColumn,
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// exporting enum definition
// export const roleEnum = pgEnum("roles", ["admin", "viewer", "editor"]);

export const usersTable = pgTable(
  "users",
  {
    id: varchar().notNull().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    image: varchar({ length: 255 }).notNull().unique(),
    created_at: timestamp().defaultNow().notNull(),
  },
  (table) => [uniqueIndex("email_id").on(table.email)]
);

export const teamsTable = pgTable("teams", {
  id: serial("id").primaryKey(),
  team_name: varchar({ length: 100 }).notNull(),
  created_by: varchar({ length: 255 })
    .notNull()
    .references((): AnyPgColumn => usersTable.email, { onDelete: "cascade" }),
  created_at: timestamp().defaultNow().notNull(),
});

// junction table

export const membersTable = pgTable("members", {
  id: serial("id").primaryKey(),
  user_id: varchar()
    .notNull()
    .references((): AnyPgColumn => usersTable.id),
  team_id: integer()
    .notNull()
    .references((): AnyPgColumn => teamsTable.id, { onDelete: "cascade" }),
  user_role: varchar({ length: 20 }).notNull().default("viewer"),
  created_at: timestamp().defaultNow().notNull(),
});

// files table

export const filesTable = pgTable("files", {
  id: serial().primaryKey(),
  file_name: varchar().notNull(),
  team_id: integer()
    .notNull()
    .references((): AnyPgColumn => teamsTable.id, { onDelete: "cascade" }),
  created_by: varchar()
    .notNull()
    .references((): AnyPgColumn => usersTable.email, { onDelete: "cascade" }),

  is_archive: boolean().default(false),
  document: varchar().default(""),
  whiteboard: varchar().default(""),

  created_at: timestamp().defaultNow().notNull(),
});

// content: jsonb("content")
//     .$type<{
//       time: number;
//       blocks: { type: string; data: Record<string, any> }[];
//       version: string;
//     }>() // ✅ Type-safe JSON
//     .notNull(),
