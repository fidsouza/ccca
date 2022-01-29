import CouponRepository from '../../../domain/repository/CouponRepository';
import ItemRepository from '../../../domain/repository/ItemRepository';
import OrderRepository from '../../../domain/repository/OrderRepository';
import MysqlConnectionAdapter from '../../database/orm/ConnectionMysql';
import RepositoryFactory from '../../../domain/factory/RepositoryFactory';
import CouponRepositoryDatabase from '../database/CouponRepositoryDatabase';
import ItemRepositoryDatabase from '../database/itemRepositoryDatabase';
import OrderRepositoryDatabase from '../database/OrderRepositoryDatabase';

export default class DatabaseRepositoryFactory implements RepositoryFactory {
  constructor(readonly connection: MysqlConnectionAdapter) {}

  createItemRepository(): ItemRepository {
    return new ItemRepositoryDatabase(this.connection);
  }

  createCouponRepository(): CouponRepository {
    return new CouponRepositoryDatabase(this.connection);
  }

  createOrderRepository(): OrderRepository {
    return new OrderRepositoryDatabase(this.connection);
  }
}
