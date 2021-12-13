import Coupon from '../../../domain/entity/coupon';
import CouponRepository from '../../../domain/repository/CouponRepository';

export default class CouponRepositoryMemory implements CouponRepository {
  coupon: Coupon[];
  constructor() {
    this.coupon = [new Coupon('VALE20', 20)];
  }
  findByCode(code: String): Promise<Coupon | undefined> {
    return Promise.resolve(this.coupon.find((coupon) => coupon.code === code));
  }
}
