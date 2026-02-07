import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const patients = sqliteTable('patients', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    gender: text('gender', { enum: ['male', 'female'] }).notNull(), // TODO: use PatientSchema?
    email: text('email'),
    phone: text('phone'),
    mobile: text('mobile'),
    createdAt: integer('created_at')
        .notNull()
        .$defaultFn(() => Date.now()),
    updatedAt: integer('updated_at')
        .notNull()
        .$defaultFn(() => Date.now())
        .$onUpdate(() => Date.now()),
});
