import { Table, Column, Model } from 'sequelize-typescript';
import { Optional } from 'sequelize';

interface CouponAttributes {
  code: String;
  percentage: number;
  expire_date: Date;
}

interface CouponCreationAttributes extends Optional<CouponAttributes, 'code'> {}

@Table({
  tableName: 'coupons',
  timestamps: false
})
export default class CouponModel extends Model<
  CouponAttributes,
  CouponCreationAttributes
> {
  @Column({ primaryKey: true, autoIncrement: false })
  code!: String;

  @Column
  percentage!: number;

  @Column
  expire_date!: Date;
}
