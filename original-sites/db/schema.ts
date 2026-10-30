import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const siteContacts = sqliteTable('site_contacts', {
 id: text('id').primaryKey(),
 whatsapp: text('whatsapp').notNull().default(''),
 instagram: text('instagram').notNull().default(''),
 updatedAt: text('updated_at').notNull().default(''),
});
