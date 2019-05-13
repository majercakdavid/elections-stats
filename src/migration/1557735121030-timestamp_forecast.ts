import {MigrationInterface, QueryRunner} from "typeorm";

export class timestampForecast1557735121030 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "forecast" ADD "time" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "forecast" DROP COLUMN "time"`);
    }

}
