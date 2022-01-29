import RepositoryFactory from '../../../domain/factory/RepositoryFactory';
import CouponRepository from '../../../domain/repository/CouponRepository';
import ItemRepository from '../../../domain/repository/ItemRepository';
import OrderRepository from '../../../domain/repository/OrderRepository';
import CouponRepositoryMemory from '../memory/CouponRepositoryMemory';
import ItemRepositoryMemory from '../memory/ItemRepositoryMemory';
import OrderRepositoryMemory from '../memory/OrderRepositoryMemory';

export default class MemoryRepositoryFactory implements RepositoryFactory {
  createCouponRepository(): CouponRepository {
    return new CouponRepositoryMemory();
  }
  createItemRepository(): ItemRepository {
    return new ItemRepositoryMemory();
  }
  createOrderRepository(): OrderRepository {
    return new OrderRepositoryMemory();
  }
}
