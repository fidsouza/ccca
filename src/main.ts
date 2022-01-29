import PlaceOrder from './application/useCase/order/PlaceOrder';
import SimulateFreight from './application/useCase/shipping/SimulateFreight';
import DefaultFreight from './domain/entity/defaultFreight';
import MysqlConnectionAdapter from './infra/database/orm/ConnectionMysql';
import ExpressAdapter from './infra/http/ExpressAdapter';
import DatabaseRepositoryFactory from './infra/repository/factory/DatabaseRepositoryFactory';

const connection = new MysqlConnectionAdapter();
const repositoryFactory = new DatabaseRepositoryFactory(connection);

const expressAdapter = new ExpressAdapter();
expressAdapter.on('/orders', 'post', async function (params: any, body: any) {
  try {
    const placeOrder = new PlaceOrder(repositoryFactory);
    return placeOrder.execute(body);
  } catch (error) {
    console.log(error);
  }
});
expressAdapter.on(
  '/simulateFreight',
  'post',
  async function (params: any, body: any) {
    try {
      const simulateFreight = new SimulateFreight(
        repositoryFactory.createItemRepository(),
        new DefaultFreight()
      );
      return simulateFreight.execute(body);
    } catch (error) {
      console.log(error);
    }
  }
);

expressAdapter.listen(3000);
