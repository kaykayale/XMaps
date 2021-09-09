import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  return await knex.schema.raw(`
        CREATE TABLE "person" (
            "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
            "name" varchar NOT NULL,
            "gender" varchar NOT NULL,
            "bornAt" date NOT NULL,
            "nacionality" varchar NOT NULL,
            "bio" text
        );
    `)
}

export async function down (knex: Knex): Promise<void> {
  return await knex.schema.dropTable('person')
}
