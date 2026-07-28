CREATE TABLE "members" (
	"member_id" text NOT NULL,
	"member_name" text NOT NULL,
	"part_of" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "boards" ADD COLUMN "board_creator" text NOT NULL;--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_member_id_user_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_member_name_user_name_fk" FOREIGN KEY ("member_name") REFERENCES "public"."user"("name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_part_of_boards_board_id_fk" FOREIGN KEY ("part_of") REFERENCES "public"."boards"("board_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "boards" ADD CONSTRAINT "boards_board_creator_user_name_fk" FOREIGN KEY ("board_creator") REFERENCES "public"."user"("name") ON DELETE no action ON UPDATE no action;