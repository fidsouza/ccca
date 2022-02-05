import OrderDAO from '../../application/dao/OrderDAO';
import MysqlConnectionAdapter from '../database/orm/ConnectionMysql';
import OrderModel from '../database/orm/models/order.model';

export default class OrderDAODatabase implements OrderDAO {
  constructor(readonly connection: MysqlConnectionAdapter) {
    this.connection = connection;
  }
  get(code: string): Promise<any> {
    const output = this.connection.getModel(OrderModel).findOne({
      where: { code }
    });
    return output;
  }
}
