import {MigrationInterface, QueryRunner} from "typeorm";

export class departureTime1557066951713 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "flight" ADD "departureTime" character varying NOT NULL DEFAULT '16:00'`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "flight" DROP COLUMN "departureTime"`);
    }

}
