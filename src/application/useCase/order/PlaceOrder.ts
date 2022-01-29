import Order from '../../../domain/entity/order';
import CouponRepository from '../../../domain/repository/CouponRepository';
import ItemRepository from '../../../domain/repository/ItemRepository';
import OrderRepository from '../../../domain/repository/OrderRepository';
import repositoryFactory from '../../../domain/factory/RepositoryFactory';
import PlaceOrderInput from './dto/PlaceOrderInput';
import PlaceOrderOutput from './dto/PlaceOrderOutput';

export default class PlaceOrder {
  itemRepository: ItemRepository;
  couponRepository: CouponRepository;
  orderRepository: OrderRepository;
  constructor(readonly repositoryFactory: repositoryFactory) {
    this.couponRepository = repositoryFactory.createCouponRepository();
    this.itemRepository = repositoryFactory.createItemRepository();
    this.orderRepository = repositoryFactory.createOrderRepository();
  }
  async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    const order = new Order(input.cpf, input.date, input.freight);
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.findById(orderItem.idItem);
      if (!item) throw new Error('Item Not found');
      order.addItem(item, orderItem.quantity);
    }
    if (input.coupon) {
      const coupon = await this.couponRepository.findByCode(input.coupon);
      if (coupon) order.addCoupon(coupon);
    }
    await this.orderRepository.save(order);
    const total = order.getTotal();
    const freight = order.getFreight();
    const output = new PlaceOrderOutput(total, freight);
    return output;
  }
}
