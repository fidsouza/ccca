import Coupon from '../../../domain/entity/coupon';
import CouponRepository from '../../../domain/repository/CouponRepository';
import MysqlConnectionAdapter from '../../database/orm/ConnectionMysql';
import CouponModel from '../../database/orm/models/coupon.model';

export default class CouponRepositoryDatabase implements CouponRepository {
  constructor(readonly connection: MysqlConnectionAdapter) {
    this.connection = connection;
  }

  async findByCode(code: string): Promise<Coupon | undefined> {
    const coupon = await this.connection.getModel(CouponModel).findByPk(code);
    return new Coupon(
      coupon?.getDataValue('code'),
      coupon?.getDataValue('percentage')
    );
  }
}
