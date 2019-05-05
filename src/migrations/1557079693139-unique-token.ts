import {MigrationInterface, QueryRunner} from "typeorm";

export class uniqueToken1557079693139 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a4c4014258840f4774f8815109" ON "ticket" ("token") `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_a4c4014258840f4774f8815109"`);
    }

}
