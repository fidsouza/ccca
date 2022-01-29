import CouponRepository from '../repository/CouponRepository';
import ItemRepository from '../repository/ItemRepository';
import OrderRepository from '../repository/OrderRepository';

export default interface RepositoryFactory {
  createCouponRepository(): CouponRepository;
  createItemRepository(): ItemRepository;
  createOrderRepository(): OrderRepository;
}
