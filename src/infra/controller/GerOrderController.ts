import OrderDAO from '../../application/dao/OrderDAO';
import GetOrder from '../../application/query/GetOrder';

export default class GetOrderController {
  constructor(readonly orderDAO: OrderDAO) {}
  execute(params: any, body: any) {
    const getOrder = new GetOrder(this.orderDAO);
    return getOrder.execute(params.code);
  }
}
