import { pgTable, serial, varchar, integer, decimal, timestamp } from 'drizzle-orm/pg-core';

export const portfolios = pgTable('portfolios', {
  id: serial('id').primaryKey(),
  memberName: varchar('member_name', { length: 255 }).notNull(),
  username: varchar('username', { length: 255 }).notNull(),
  numPortfolios: integer('num_portfolios').notNull().default(0),
  idVerification: varchar('id_verification', { length: 50 }).notNull().default('Not verified'),
  portfolioVerification: varchar('portfolio_verification', { length: 50 }).notNull().default('Not verified'),
  location: varchar('location', { length: 500 }).notNull(),
  sizeKB: decimal('size_kb', { precision: 10, scale: 2 }).notNull(),
  subscription: varchar('subscription', { length: 50 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type Portfolio = typeof portfolios.$inferSelect;
export type NewPortfolio = typeof portfolios.$inferInsert; 