import { relations } from "drizzle-orm";
import { pgTable, integer, text, serial, pgEnum } from "drizzle-orm/pg-core"


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

export const statusEnum = pgEnum('status', ['in_review', 'done', 'canceled']);

export const matches = pgTable('matches', {
	id: serial().primaryKey(),
	candidateName: text(),
	analysis: text(),
	status: statusEnum().default('in_review'),
});

export const matchesRelations = relations(matches, ({many}) => ({
	feedbacks: many(feedbacks)
}))

export const feedbacks = pgTable('feedbacks', {
	id: serial().primaryKey(),
	feedback: text(),
	matchId: integer(),
})

export const feedbacksRelations = relations(feedbacks, ({one}) => ({
	matchId: one(matches, {
		fields: [feedbacks.matchId],
		references: [matches.id]
	})
}))






// export const matchesRelations = relations(matches, ({one}) => ({
// 	matchingCandidate: one(candidates, {
// 		fields: [matches.matchingCandidateId],
// 		references: [candidates.id]
// 	})
// }))