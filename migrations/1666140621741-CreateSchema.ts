import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSchema1666140621741 implements MigrationInterface {
    name = 'CreateSchema1666140621741'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "game" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "played_at" TIMESTAMP WITH TIME ZONE NOT NULL, "memberId" integer, CONSTRAINT "UQ_2adad445a257614b3caf0c4624d" UNIQUE ("name", "played_at", "memberId"), CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "member" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_8174d0498e41d6e7c108b657e79" UNIQUE ("name"), CONSTRAINT "PK_97cbbe986ce9d14ca5894fdc072" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_006c190885a7ef3055deaf61652" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_006c190885a7ef3055deaf61652"`);
        await queryRunner.query(`DROP TABLE "member"`);
        await queryRunner.query(`DROP TABLE "game"`);
    }

}
