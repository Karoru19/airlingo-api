import {MigrationInterface, QueryRunner} from "typeorm";

export class unique1556998565564 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "reset_token" ("id" SERIAL NOT NULL, "key" character varying NOT NULL, "userId" integer, CONSTRAINT "REL_1d61419c157e5325204cbee7a2" UNIQUE ("userId"), CONSTRAINT "PK_93e1171b4a87d2d0478295f1a99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_c03d17bcafe3bc4b9a22d01d76" ON "reset_token" ("key") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_7f7185cd4c53db5cda9e2d453f" ON "auth_token" ("key") `);
        await queryRunner.query(`ALTER TABLE "reset_token" ADD CONSTRAINT "FK_1d61419c157e5325204cbee7a28" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "reset_token" DROP CONSTRAINT "FK_1d61419c157e5325204cbee7a28"`);
        await queryRunner.query(`DROP INDEX "IDX_7f7185cd4c53db5cda9e2d453f"`);
        await queryRunner.query(`DROP INDEX "IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`DROP INDEX "IDX_c03d17bcafe3bc4b9a22d01d76"`);
        await queryRunner.query(`DROP TABLE "reset_token"`);
    }

}
