CREATE TABLE "candidates" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE "matches" (
	"id" serial PRIMARY KEY NOT NULL,
	"matchingCandidateId" integer,
	"analysis" text
);
