import OrderDAODatabase from '../../infra/dao/OrderDAODatabase';
import MysqlConnectionAdapter from '../../infra/database/orm/ConnectionMysql';
import OrderRepositoryDatabase from '../../infra/repository/database/OrderRepositoryDatabase';
import DatabaseRepositoryFactory from '../../infra/repository/factory/DatabaseRepositoryFactory';
import GetOrder from '../query/GetOrder';
import PlaceOrder from '../useCase/order/PlaceOrder';

let placeOrder: PlaceOrder;
let getOrder: GetOrder;
let orderRepository: OrderRepositoryDatabase;
let orderDaoDatabase: OrderDAODatabase;
const connectionDb = new MysqlConnectionAdapter();

beforeEach(async () => {
  orderRepository = new OrderRepositoryDatabase(connectionDb);
  orderDaoDatabase = new OrderDAODatabase(connectionDb);
  const repositoryFactory = new DatabaseRepositoryFactory(connectionDb);
  placeOrder = new PlaceOrder(repositoryFactory);
  getOrder = new GetOrder(orderDaoDatabase);
  await orderRepository.clear();
});

test('Deve retornar um pedido usando o DAO', async () => {
  const input = {
    cpf: '236.746.610-63',
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 3 }
    ],
    date: new Date('2021-12-10'),
    coupon: 'VALE20'
  };
  const output = await placeOrder.execute(input);
  const { code } = await getOrder.execute(output.code);
  expect(code).toBe('202100000001');
});

afterAll(async () => {
  await orderRepository.clear();
});
