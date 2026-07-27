ALTER TABLE "boards" DROP CONSTRAINT "boards_board_creator_user_name_fk";
--> statement-breakpoint
ALTER TABLE "boards" DROP COLUMN "board_creator";