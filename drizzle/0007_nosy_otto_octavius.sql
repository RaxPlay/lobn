ALTER TABLE "members" ADD COLUMN "membership_id" uuid DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "part_of_name" varchar;--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_part_of_name_boards_board_name_fk" FOREIGN KEY ("part_of_name") REFERENCES "public"."boards"("board_name") ON DELETE no action ON UPDATE no action;