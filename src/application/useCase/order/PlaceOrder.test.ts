import FixedFreightCalculator from '../../../domain/entity/fixedFreightCalculator';
import MysqlConnectionAdapter from '../../../infra/database/orm/ConnectionMysql';
import OrderRepositoryDatabase from '../../../infra/repository/database/OrderRepositoryDatabase';
import DatabaseRepositoryFactory from '../../../infra/repository/factory/DatabaseRepositoryFactory';
import PlaceOrder from './PlaceOrder';

let placeOrder: PlaceOrder;
let orderRepository: OrderRepositoryDatabase;
const connectionDb = new MysqlConnectionAdapter();

beforeEach(async () => {
  orderRepository = new OrderRepositoryDatabase(connectionDb);
  const repositoryFactory = new DatabaseRepositoryFactory(connectionDb);
  placeOrder = new PlaceOrder(repositoryFactory);
  await orderRepository.clear();
});

describe('Para criar um pedido', () => {
  test('Deve gerar um pedido com cupom', async () => {
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
    expect(output.total).toBe(64);
  });
  test('Deve gerar um pedido sem cupom', async () => {
    const input = {
      cpf: '236.746.610-63',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 3 }
      ],
      date: new Date('2021-12-10')
    };
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(180);
  });
  test('Deve gerar um pedido com frete default', async () => {
    const input = {
      cpf: '236.746.610-63',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 3 }
      ],
      date: new Date('2021-12-10')
    };
    const output = await placeOrder.execute(input);
    const total = output.freight ? output.freight + output.total : output.total;
    expect(total).toBe(190);
  });

  test('Deve gerar um pedido com frete fixo', async () => {
    const input = {
      cpf: '236.746.610-63',
      orderItems: [{ idItem: 1, quantity: 1 }],
      date: new Date('2021-12-10'),
      freight: new FixedFreightCalculator()
    };
    const output = await placeOrder.execute(input);
    const total = output.freight ? output.freight + output.total : output.total;
    expect(total).toBe(40);
  });
});

afterAll(async () => {
  await orderRepository.clear();
});
