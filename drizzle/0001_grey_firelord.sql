CREATE TABLE "task_comments" (
	"comment_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"comment_content" varchar(255) NOT NULL,
	"comment_creator" text,
	"original_task_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"task_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"task_content" varchar(150) NOT NULL,
	"task_creator" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "task_comments" ADD CONSTRAINT "task_comments_comment_creator_user_name_fk" FOREIGN KEY ("comment_creator") REFERENCES "public"."user"("name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task_comments" ADD CONSTRAINT "task_comments_original_task_id_tasks_task_id_fk" FOREIGN KEY ("original_task_id") REFERENCES "public"."tasks"("task_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_task_creator_user_name_fk" FOREIGN KEY ("task_creator") REFERENCES "public"."user"("name") ON DELETE no action ON UPDATE no action;