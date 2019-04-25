import {MigrationInterface, QueryRunner} from "typeorm";

export class tickets1555254986398 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "plane" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "numberOfPlanes" integer NOT NULL, "pricePerKm" integer NOT NULL, "seats" integer NOT NULL, "seatsInRow" integer NOT NULL, "seatsInBusinessClass" integer NOT NULL, "luggageLimit" integer NOT NULL, "handLuggageLimit" integer NOT NULL, CONSTRAINT "PK_c7a759d7e8723c8c1a79d52a63a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "flight" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "from" character varying NOT NULL, "to" character varying NOT NULL, "duration" integer NOT NULL, "distance" integer NOT NULL, "planeId" integer, CONSTRAINT "PK_bf571ce6731cf071fc51b94df03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ticket" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "price" integer NOT NULL, "discount" integer, "pdf" character varying, "token" character varying NOT NULL, "userId" integer, "flightId" integer, CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "flight" ADD CONSTRAINT "FK_3de2a81799a61144435de1738da" FOREIGN KEY ("planeId") REFERENCES "plane"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_0e01a7c92f008418bad6bad5919" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_e3b0a288a85621afc10f87c8447" FOREIGN KEY ("flightId") REFERENCES "flight"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_e3b0a288a85621afc10f87c8447"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_0e01a7c92f008418bad6bad5919"`);
        await queryRunner.query(`ALTER TABLE "flight" DROP CONSTRAINT "FK_3de2a81799a61144435de1738da"`);
        await queryRunner.query(`DROP TABLE "ticket"`);
        await queryRunner.query(`DROP TABLE "flight"`);
        await queryRunner.query(`DROP TABLE "plane"`);
    }

}
