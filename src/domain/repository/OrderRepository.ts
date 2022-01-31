import Freight from '../entity/freightCalculator';
import Order from '../entity/order';

export default interface OrderRepository {
  save(order: Order): Promise<void>;
  get(code: string, freight: Freight): Promise<Order>;
  clear(): Promise<void>;
}
