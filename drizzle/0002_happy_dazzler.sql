CREATE TABLE "boards" (
	"board_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"board_name" varchar(50) NOT NULL,
	"board_password" varchar(100) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "task_comments" ADD COLUMN "board_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "board_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "task_comments" ADD CONSTRAINT "task_comments_board_id_boards_board_id_fk" FOREIGN KEY ("board_id") REFERENCES "public"."boards"("board_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_board_id_boards_board_id_fk" FOREIGN KEY ("board_id") REFERENCES "public"."boards"("board_id") ON DELETE no action ON UPDATE no action;