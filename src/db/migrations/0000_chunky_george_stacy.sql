CREATE TYPE "public"."app_user_role" AS ENUM('rider', 'staff', 'admin', 'super_admin');--> statement-breakpoint
CREATE TABLE "app_settings" (
	"key" text PRIMARY KEY NOT NULL,
	"boolean_value" boolean,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "app_user" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"role" "app_user_role" DEFAULT 'staff' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
INSERT INTO "app_user" ("user_id")
SELECT id
FROM auth.users
ON CONFLICT ("user_id") DO NOTHING;
--> statement-breakpoint
DELETE FROM "app_user" au
WHERE NOT EXISTS (
	SELECT 1
	FROM auth.users u
	WHERE u.id = au.user_id
);
--> statement-breakpoint
DO $$
BEGIN
	IF NOT EXISTS (
		SELECT 1
		FROM pg_constraint
		WHERE conname = 'app_user_user_id_auth_users_fk'
	) THEN
		ALTER TABLE "app_user"
		ADD CONSTRAINT "app_user_user_id_auth_users_fk"
		FOREIGN KEY ("user_id") REFERENCES auth.users("id")
		ON DELETE CASCADE;
	END IF;
END
$$;
--> statement-breakpoint
CREATE OR REPLACE FUNCTION public.handle_auth_user_created()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
	INSERT INTO public.app_user (user_id)
	VALUES (NEW.id)
	ON CONFLICT (user_id) DO NOTHING;

	RETURN NEW;
END;
$$;
--> statement-breakpoint
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
--> statement-breakpoint
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_auth_user_created();
