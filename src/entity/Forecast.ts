import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import {ColumnNumericTransformer} from "../transformers/ColumnNumericTransformer";
import Party from "./Party";
import UserForecast from "./UserForecast";

@Entity()
export default class Forecast {
    @ManyToOne(type => UserForecast, userForecast => userForecast.forecasts, {primary: true})
    userForecast: UserForecast;

    @PrimaryColumn()
    version: number;

    @ManyToOne(type => Party, {primary: true})
    @JoinColumn()
    party: Party;

    @Column('numeric', {precision: 4, scale: 1, transformer: new ColumnNumericTransformer()})
    percentage: number;

    @Column({default: true})
    valid: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    time: string;
}
