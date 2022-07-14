import { MigrationInterface, QueryRunner } from "typeorm";

export class nomeDaMigration1657815306571 implements MigrationInterface {
    name = 'nomeDaMigration1657815306571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "agents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(158) NOT NULL, "email" character varying(158) NOT NULL, "password" character varying NOT NULL, "isactive" boolean NOT NULL, CONSTRAINT "UQ_5fdef501c63984b1b98abb1e68c" UNIQUE ("email"), CONSTRAINT "PK_9c653f28ae19c5884d5baf6a1d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "state" character varying(2) NOT NULL, "city" character varying(158) NOT NULL, "cep" character varying NOT NULL, "number" integer NOT NULL, "street" character varying NOT NULL, "agent_id" uuid, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "family" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "address_id" uuid, CONSTRAINT "REL_78d06253830bef5a9c5bdb090a" UNIQUE ("address_id"), CONSTRAINT "PK_ba386a5a59c3de8593cda4e5626" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "home_visit" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying(50), "message" character varying(500) NOT NULL, "agent_id" uuid, "address_id" uuid, CONSTRAINT "PK_c7d318eee093192484324b7cf60" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_35d46348056426de84383032572" FOREIGN KEY ("agent_id") REFERENCES "agents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "family" ADD CONSTRAINT "FK_78d06253830bef5a9c5bdb090a8" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "home_visit" ADD CONSTRAINT "FK_371da1ea4bc6acad5b512ff298d" FOREIGN KEY ("agent_id") REFERENCES "agents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "home_visit" ADD CONSTRAINT "FK_6896736c68ee15e362c4e642f93" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "home_visit" DROP CONSTRAINT "FK_6896736c68ee15e362c4e642f93"`);
        await queryRunner.query(`ALTER TABLE "home_visit" DROP CONSTRAINT "FK_371da1ea4bc6acad5b512ff298d"`);
        await queryRunner.query(`ALTER TABLE "family" DROP CONSTRAINT "FK_78d06253830bef5a9c5bdb090a8"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_35d46348056426de84383032572"`);
        await queryRunner.query(`DROP TABLE "home_visit"`);
        await queryRunner.query(`DROP TABLE "family"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "agents"`);
    }

}
