import { Table, Column, Model } from 'sequelize-typescript';
import { Optional } from 'sequelize';

interface OrderAttributtes {
  id_order: number;
  coupon: string;
  code: string;
  cpf: string;
  issue_date: Date;
  freight: number;
  sequence: number;
}

interface OrderCreationAttributes
  extends Optional<OrderAttributtes, 'id_order'> {}

@Table({
  tableName: 'orders',
  timestamps: false
})
export default class OrderModel extends Model<
  OrderAttributtes,
  OrderCreationAttributes
> {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @Column
  id_order!: number;

  @Column
  coupon!: string;

  @Column
  code!: string;

  @Column
  cpf!: string;

  @Column
  issue_date!: Date;

  @Column
  freight!: number;

  @Column
  sequence!: number;
}
