import Cpf from './validatecpf';
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
  private cpf: Cpf;
  private code: OrderCode;

  constructor(
    cpf: string,
    readonly issueDate: Date,
    readonly freighCalculator: Freight = new DefaultFreight(),
    readonly sequence: number = 1
  ) {
    this.cpf = new Cpf(cpf);
    this.orderItens = [];
    this.freight = 0;
    this.code = new OrderCode(sequence, issueDate);
  }

  addItem(Item: Item, quantity: number) {
    this.freight += this.freighCalculator.calculate(Item) * quantity;
    this.orderItens.push(new OrderItem(Item.idItem, Item.price, quantity));
  }

  getFreight() {
    return Math.round(this.freight);
  }

  getOrder() {
    return this.code.orderCode;
  }

  getCodeCoupon() {
    return this.coupon?.code;
  }

  getCpf() {
    return this.cpf.value;
  }

  getOrderItems() {
    return this.orderItens;
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
        total += +item.price * +item.quantity;
      }
    });
    return total;
  }
}
