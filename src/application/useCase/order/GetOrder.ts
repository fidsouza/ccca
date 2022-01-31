import DefaultFreight from '../../../domain/entity/defaultFreight';
import Freight from '../../../domain/entity/freightCalculator';
import RepositoryFactory from '../../../domain/factory/RepositoryFactory';
import OrderRepository from '../../../domain/repository/OrderRepository';
import GetOrderOutput from './dto/GetOrderOutput';

export default class GetOrder {
  orderRepository: OrderRepository;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly freightCalculator: Freight = new DefaultFreight()
  ) {
    this.orderRepository = repositoryFactory.createOrderRepository();
  }

  async execute(code: string): Promise<GetOrderOutput> {
    const order = await this.orderRepository.get(code, this.freightCalculator);
    const getOrderOutput = new GetOrderOutput(
      order.getOrder(),
      order.getTotal()
    );
    return getOrderOutput;
  }
}
