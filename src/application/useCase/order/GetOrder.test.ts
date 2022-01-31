import MysqlConnectionAdapter from '../../../infra/database/orm/ConnectionMysql';
import OrderRepositoryDatabase from '../../../infra/repository/database/OrderRepositoryDatabase';
import DatabaseRepositoryFactory from '../../../infra/repository/factory/DatabaseRepositoryFactory';
import GetOrder from './GetOrder';
import PlaceOrder from './PlaceOrder';

let placeOrder: PlaceOrder;
let getOrder: GetOrder;
let orderRepository: OrderRepositoryDatabase;
const connectionDb = new MysqlConnectionAdapter();

beforeEach(async () => {
  orderRepository = new OrderRepositoryDatabase(connectionDb);
  const repositoryFactory = new DatabaseRepositoryFactory(connectionDb);
  placeOrder = new PlaceOrder(repositoryFactory);
  getOrder = new GetOrder(repositoryFactory);
  await orderRepository.clear();
});

describe('Para criar um pedido', () => {
  test('Deve buscar um pedido pelo codigo', async () => {
    const input = {
      cpf: '236.746.610-63',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 3 }
      ],
      date: new Date('2021-12-10'),
      coupon: 'VALE20'
    };
    const placeOrderOutput = await placeOrder.execute(input);
    const getOrderOutput = await getOrder.execute(placeOrderOutput.code);
    expect(getOrderOutput.code).toBe('202100000001');
    expect(getOrderOutput.total).toBe(140);
  });
});

afterAll(async () => {
  await orderRepository.clear();
});
