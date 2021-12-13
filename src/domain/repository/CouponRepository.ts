import Coupon from '../entity/coupon';

export default interface CouponRepository {
  findByCode(code: String): Promise<Coupon | undefined>;
}
