import { relations } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  serial,
  pgEnum,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

// export const candidates = pgTable('candidates', {
// 	id: serial().primaryKey(),
// 	name: text()
// })

// export const candidatesRelations = relations(candidates, ({many}) => ({
// 	matches: many(matches)
// }))

// export const matches = pgTable('matches', {
// 	id: serial().primaryKey(),
// 	matchingCandidateId: integer(),
// 	analysis: text()
// });

export const statusEnum = pgEnum("status", ["in_review", "done", "canceled"]);

export const matches = pgTable("matches", {
  id: serial().primaryKey(),
  authorId: text(),
  candidateName: text(),
  analysis: text(),
  status: statusEnum().default("in_review"),
});

export const matchesRelations = relations(matches, ({ many }) => ({
  feedbacks: many(feedbacks),
}));

export const feedbacks = pgTable("feedbacks", {
  id: serial().primaryKey(),
  feedback: text(),
  matchId: integer(),
});

export const feedbacksRelations = relations(feedbacks, ({ one }) => ({
  matchId: one(matches, {
    fields: [feedbacks.matchId],
    references: [matches.id],
  }),
}));

// export const matchesRelations = relations(matches, ({one}) => ({
// 	matchingCandidate: one(candidates, {
// 		fields: [matches.matchingCandidateId],
// 		references: [candidates.id]
// 	})
// }))

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  slack_access_token: text("slack_access_token"),
  slack_user_id: text("slack_user_id"),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
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
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});
