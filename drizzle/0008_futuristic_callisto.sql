ALTER TABLE "members" ADD PRIMARY KEY ("membership_id");--> statement-breakpoint
ALTER TABLE "members" ALTER COLUMN "part_of_name" SET NOT NULL;