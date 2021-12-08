import Coupon from './coupon';

describe('Coupon tests', () => {
  test('Não deve criar um cupom valido', () => {
    const coupon = new Coupon('VALE10', 10, new Date('2021-12-05'));
    const applyCoupon = coupon.isExpired(new Date('2021-12-04'));
    expect(applyCoupon).toBeFalsy();
  });
  test('Deve criar um cupom valido', () => {
    const coupon = new Coupon('VALE10', 10, new Date('2021-12-07'));
    const applyCoupon = coupon.isExpired(new Date('2021-12-08'));
    expect(applyCoupon).toBeTruthy();
  });
});
