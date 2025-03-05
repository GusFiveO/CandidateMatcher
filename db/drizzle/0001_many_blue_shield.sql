DROP TABLE "candidates" CASCADE;--> statement-breakpoint
ALTER TABLE "matches" ADD COLUMN "candidateName" text;--> statement-breakpoint
ALTER TABLE "matches" DROP COLUMN "matchingCandidateId";