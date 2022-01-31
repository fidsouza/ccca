import GetOrder from '../../application/useCase/order/GetOrder';
import SimulateFreight from '../../application/useCase/shipping/SimulateFreight';
import DefaultFreight from '../../domain/entity/defaultFreight';
import RepositoryFactory from '../../domain/factory/RepositoryFactory';
import GetOrderController from '../controller/GerOrderController';
import PlaceOrderController from '../controller/PlaceOrderController';
import Http from './Http';

export default class RouteConfig {
  constructor(http: Http, readonly repositoryFactory: RepositoryFactory) {
    http.on('/orders', 'post', async function (params: any, body: any) {
      const placeOrderController = new PlaceOrderController();
      return placeOrderController.execute(params, body, repositoryFactory);
    });
    http.on(
      '/simulateFreight',
      'post',
      async function (params: any, body: any) {
        const simulateFreight = new SimulateFreight(
          repositoryFactory.createItemRepository(),
          new DefaultFreight()
        );
        return simulateFreight.execute(body);
      }
    );
    http.on('/orders/:code', 'get', async function (params: any, body: any) {
      const getOrderController = new GetOrderController();
      return getOrderController.execute(params, body, repositoryFactory);
    });
  }
}
