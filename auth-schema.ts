import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, index, uuid, varchar } from "drizzle-orm/pg-core";

export const BoardTable = pgTable("boards", {
  boardId: uuid("board_id").defaultRandom().primaryKey(),
  boardName: varchar("board_name", { length: 50 }).notNull(),
  boardPassword: varchar("board_password", { length: 100} ).notNull(),
  boardCreator: text("board_creator").references(() => user.name).notNull(),
  //When selecting, left join tasks
});

export const MembersTable = pgTable("members", {
  membershipId: uuid("membership_id").defaultRandom().primaryKey(),
  memberId: text("member_id").references(() => user.id).notNull(),
  memberName: text("member_name").references(() => user.name).notNull(),
  partOf: uuid("part_of").references(() => BoardTable.boardId).notNull(),
  partOfName: varchar("part_of_name").references(() => BoardTable.boardName).notNull(),
});

export const TaskTable = pgTable("tasks", {
  taskId: uuid("task_id").defaultRandom().primaryKey(),
  taskContent: varchar("task_content", { length: 150 }).notNull(),
  taskCreator: text("task_creator").references(() => user.name).notNull(),
  boardId: uuid("board_id").references(() => BoardTable.boardId).notNull(),
  //When selecting, left join comments
});

// export const CommentsTable = pgTable("task_comments", {
//   commentId: uuid("comment_id").defaultRandom().primaryKey(),
//   commmentContent: varchar("comment_content", { length: 255 }).notNull(),
//   commentCreator: text("comment_creator").references(() => user.name),
//   originalTaskId: uuid("original_task_id").references(() => TaskTable.taskId),
//   boardId: uuid("board_id").references(() => BoardTable.boardId).notNull(),
// })

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const TaskRelations = relations(TaskTable, ({one, many}) => ({
  user: one(user, {
    fields: [TaskTable.taskCreator],
    references: [user.name],
  }),
  //comments: many(CommentsTable),
}));

// export const CommentRelations = relations(CommentsTable, ({one}) => ({
//   user: one(user, {
//     fields: [CommentsTable.commentCreator],
//     references: [user.name],
//   }),
//   task: one(TaskTable, {
//     fields: [CommentsTable.originalTaskId],
//     references: [TaskTable.taskId],
//   }),
// }));

export const BoardRelations = relations(BoardTable, ({many}) => ({
  tasks: many(TaskTable),
  //comments: many(CommentsTable)
}))