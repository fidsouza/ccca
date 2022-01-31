import Coupon from '../../../domain/entity/coupon';
import Freight from '../../../domain/entity/freightCalculator';
import Item from '../../../domain/entity/item';
import Order from '../../../domain/entity/order';
import OrderRepository from '../../../domain/repository/OrderRepository';
import MysqlConnectionAdapter from '../../database/orm/ConnectionMysql';
import CouponModel from '../../database/orm/models/coupon.model';
import ItemModel from '../../database/orm/models/Item.model';
import OrderModel from '../../database/orm/models/order.model';
import OrderItemModel from '../../database/orm/models/orderItem.model';

export default class OrderRepositoryDatabase implements OrderRepository {
  constructor(readonly connection: MysqlConnectionAdapter) {
    this.connection = connection;
  }

  async save(order: Order): Promise<void> {
    const orderData = await this.connection.getModel(OrderModel).create({
      id_order: order.getOrder(),
      code: order.getOrder(),
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

  async get(code: string, freight: Freight): Promise<Order> {
    const orderData = await this.connection
      .getModel(OrderModel)
      .findOne({ where: { code: code } });
    if (!orderData) throw new Error('Order Not found');
    const order = new Order(
      orderData.getDataValue('cpf'),
      orderData.getDataValue('issue_date'),
      freight,
      orderData.getDataValue('sequence')
    );
    const orderItemsData = await this.connection
      .getModel(OrderItemModel)
      .findAll({ where: { id_order: orderData.getDataValue('id_order') } });
    for await (const orderItemData of orderItemsData) {
      const itemData = await this.connection.getModel(ItemModel).findOne({
        where: { id_item: orderItemData.getDataValue('id_item') }
      });
      const item = new Item(
        itemData?.getDataValue('id_item'),
        itemData?.getDataValue('category'),
        itemData?.getDataValue('description'),
        orderItemData.getDataValue('price'),
        itemData?.getDataValue('width'),
        itemData?.getDataValue('height'),
        itemData?.getDataValue('length'),
        itemData?.getDataValue('weight')
      );
      order.addItem(item, orderItemData.getDataValue('quantity'));
    }
    const couponData = await this.connection
      .getModel(CouponModel)
      .findOne({ where: { code: orderData.getDataValue('coupon') } });
    if (orderData.getDataValue('coupon')) {
      const coupon = new Coupon(
        couponData?.getDataValue('code'),
        couponData?.getDataValue('percentage'),
        couponData?.getDataValue('expire_date')
      );
      order.addCoupon(coupon);
    }

    return order;
  }
  async clear(): Promise<void> {
    await this.connection.getModel(OrderModel).destroy({ truncate: true });
    await this.connection.getModel(OrderItemModel).destroy({ truncate: true });
  }
}
