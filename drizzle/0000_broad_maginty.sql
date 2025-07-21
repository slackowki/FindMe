CREATE TABLE "portfolios" (
	"id" serial PRIMARY KEY NOT NULL,
	"member_name" varchar(255) NOT NULL,
	"username" varchar(255) NOT NULL,
	"num_portfolios" integer DEFAULT 0 NOT NULL,
	"id_verification" varchar(50) DEFAULT 'Not verified' NOT NULL,
	"portfolio_verification" varchar(50) DEFAULT 'Not verified' NOT NULL,
	"location" varchar(500) NOT NULL,
	"size_kb" numeric(10, 2) NOT NULL,
	"subscription" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
