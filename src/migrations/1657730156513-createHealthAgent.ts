import { MigrationInterface, QueryRunner } from "typeorm";

export class createHealthAgent1657730156513 implements MigrationInterface {
    name = 'createHealthAgent1657730156513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agents" ADD "isActive" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agents" DROP COLUMN "isActive"`);
    }

}
