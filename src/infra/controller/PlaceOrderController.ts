import PlaceOrder from '../../application/useCase/order/PlaceOrder';
import FreightFactoryBuilder from '../../domain/factory/FreightFactoryBuilder';
import RepositoryFactory from '../../domain/factory/RepositoryFactory';

export default class PlaceOrderController {
  execute(params: any, body: any, repositoryFactory: RepositoryFactory) {
    const freight = FreightFactoryBuilder.create(body.freight);
    const placeOrder = new PlaceOrder(repositoryFactory, freight);
    return placeOrder.execute(body);
  }
}
