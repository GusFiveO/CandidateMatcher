CREATE TYPE "public"."status" AS ENUM('in_review', 'done', 'canceled');--> statement-breakpoint
CREATE TABLE "feedbacks" (
	"id" serial PRIMARY KEY NOT NULL,
	"feedback" text,
	"matchId" integer
);
--> statement-breakpoint
ALTER TABLE "matches" ADD COLUMN "status" "status" DEFAULT 'in_review';