import Order from '../../../domain/entity/order';
import order from '../../../domain/entity/order';
import OrderRepository from '../../../domain/repository/OrderRepository';

export default class OrderRepositoryMemory implements OrderRepository {
  order: Order[];
  constructor() {
    this.order = [];
  }
  save(order: order): Promise<void> {
    this.order.push(order);
    return Promise.resolve();
  }
}
