import Cpf from '../../infra/validatecpf';
import Coupon from './coupon';
import DefaultFreight from './defaultFreight';
import Freight from './freightCalculator';
import Item from './item';
import OrderCode from './orderCode';
import OrderItem from './orderItem';

export default class Order {
  private orderItens: OrderItem[];
  private coupon: Coupon | undefined;
  private freight: number;
  cpf: Cpf;
  code: OrderCode;

  constructor(
    cpf: string,
    readonly issueDate: Date,
    readonly freighCalculator: Freight = new DefaultFreight(),
    readonly sequence: number = 1
  ) {
    this.cpf = new Cpf(cpf);
    this.orderItens = [];
    this.freight = 0;
    this.code = new OrderCode(sequence);
  }

  addItem(Item: Item, quantity: number) {
    this.freight += this.freighCalculator.calculate(Item);
    this.orderItens.push(new OrderItem(Item.price, quantity));
  }

  getFreight() {
    return Math.round(this.freight);
  }

  addCoupon(coupon: Coupon) {
    if (coupon.isExpired(this.issueDate)) return;
    this.coupon = coupon;
  }

  totalItems() {
    return this.orderItens.length;
  }
  getTotal() {
    let total = 0;
    this.orderItens.map((item) => {
      if (this.coupon) {
        total += item.price - (item.price * this.coupon.discount) / 100;
      } else {
        total += item.price;
      }
    });
    return total;
  }
}
