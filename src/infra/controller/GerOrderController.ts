import GetOrder from '../../application/useCase/order/GetOrder';
import RepositoryFactory from '../../domain/factory/RepositoryFactory';

export default class GetOrderController {
  execute(params: any, body: any, repositoryFactory: RepositoryFactory) {
    const getOrder = new GetOrder(repositoryFactory);
    return getOrder.execute(params.code);
  }
}
