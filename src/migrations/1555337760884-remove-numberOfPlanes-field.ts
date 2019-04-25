import {MigrationInterface, QueryRunner} from "typeorm";

export class removeNumberOfPlanesField1555337760884 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plane" DROP COLUMN "numberOfPlanes"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "plane" ADD "numberOfPlanes" integer NOT NULL`);
    }

}
