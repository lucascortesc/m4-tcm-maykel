import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1657725619022 implements MigrationInterface {
    name = 'createTables1657725619022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL, "state" character varying(158) NOT NULL, "city" character varying(158) NOT NULL, "cep" character varying NOT NULL, "number" integer NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
