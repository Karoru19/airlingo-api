import {MigrationInterface, QueryRunner} from "typeorm";

export class ticket1557054111850 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "ticket" ADD "window" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD "business" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "business"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "window"`);
    }

}
