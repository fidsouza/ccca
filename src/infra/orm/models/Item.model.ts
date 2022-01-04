import { Table, Column, Model } from 'sequelize-typescript';
import { Optional } from 'sequelize';

interface ItemAttibutes {
  id_item: number;
  category: string;
  description: string;
  price: number;
  width: number;
  height: number;
  length: number;
  weight: number;
}

interface ItemCreationAttributes extends Optional<ItemAttibutes, 'id_item'> {}

@Table({
  tableName: 'item',
  timestamps: false
})
export default class ItemModel extends Model<
  ItemAttibutes,
  ItemCreationAttributes
> {
  @Column({ primaryKey: true, autoIncrement: true })
  id_item!: number;

  @Column
  category!: string;

  @Column
  description!: string;

  @Column
  price!: number;

  @Column
  width!: number;

  @Column
  height!: number;

  @Column
  length!: number;

  @Column
  weight!: number;
}
