import freightCalculator from '../../../domain/entity/freightCalculator';
import Order from '../../../domain/entity/order';
import order from '../../../domain/entity/order';
import OrderRepository from '../../../domain/repository/OrderRepository';

export default class OrderRepositoryMemory implements OrderRepository {
  order: Order[];
  constructor() {
    this.order = [];
  }
  async get(code: string, freight: freightCalculator): Promise<Order> {
    const order = this.order.find((order) => order.getOrder() === code);
    if (!order) throw new Error('Order not found');
    return order;
  }
  async clear(): Promise<void> {
    this.order = [];
  }
  save(order: order): Promise<void> {
    this.order.push(order);
    return Promise.resolve();
  }
}
