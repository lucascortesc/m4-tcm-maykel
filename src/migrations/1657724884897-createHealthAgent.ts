import { MigrationInterface, QueryRunner } from "typeorm";

export class createHealthAgent1657724884897 implements MigrationInterface {
    name = 'createHealthAgent1657724884897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "agents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(158) NOT NULL, "email" character varying(158) NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_5fdef501c63984b1b98abb1e68c" UNIQUE ("email"), CONSTRAINT "PK_9c653f28ae19c5884d5baf6a1d9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "agents"`);
    }

}
