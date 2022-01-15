import order from '../../../domain/entity/order';
import OrderRepository from '../../../domain/repository/OrderRepository';
import MysqlConnectionAdapter from '../../database/orm/ConnectionMysql';
import OrderModel from '../../database/orm/models/order.model';
import OrderItemModel from '../../database/orm/models/orderItem.model';

export default class OrderRepositoryDatabase implements OrderRepository {
  constructor(readonly connection: MysqlConnectionAdapter) {
    this.connection = connection;
  }
  async save(order: order): Promise<void> {
    const orderData = await this.connection.getModel(OrderModel).create({
      id_order: order.getOrder(),
      cpf: order.getCpf(),
      issue_date: order.issueDate,
      freight: order.getFreight(),
      sequence: order.sequence,
      coupon: order.getCodeCoupon()
    });
    for (const orderItem of order.getOrderItems()) {
      await this.connection.getModel(OrderItemModel).create({
        id_order: orderData.getDataValue('id_order'),
        id_item: orderItem.idItem,
        quantity: orderItem.quantity,
        price: orderItem.price
      });
    }
  }
  async clear(): Promise<void> {
    await this.connection.getModel(OrderModel).destroy({ truncate: true });
    await this.connection.getModel(OrderItemModel).destroy({ truncate: true });
  }
}
