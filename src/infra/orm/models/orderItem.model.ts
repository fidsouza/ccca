import { Table, Column, Model } from 'sequelize-typescript';
import { Optional } from 'sequelize';

interface OrderItemAttributtes {
  id_order: number;
  id_item: number;
  price: number;
  quantity: number;
}

interface OrderItemCreationAttributes
  extends Optional<OrderItemAttributtes, 'id_order' | 'id_item'> {}

@Table({
  tableName: 'order_item',
  timestamps: false
})
export default class OrderItemModel extends Model<
  OrderItemAttributtes,
  OrderItemCreationAttributes
> {
  @Column({ primaryKey: true, autoIncrement: true })
  id_order!: number;

  @Column
  id_item!: number;

  @Column
  price!: number;

  @Column
  quantity!: number;
}
