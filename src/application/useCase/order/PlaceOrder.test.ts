import FixedFreightCalculator from '../../../domain/entity/fixedFreightCalculator';
import MysqlConnectionAdapter from '../../../infra/orm/ConnectionMysql';
import CouponRepositoryDatabase from '../../../infra/repository/database/CouponRepositoryDatabase';
import ItemRepositoryDatabase from '../../../infra/repository/database/itemRepositoryDatabase';
import OrderRepositoryDatabase from '../../../infra/repository/database/OrderRepositoryDatabase';
import PlaceOrder from './PlaceOrder';

let itemRepository: ItemRepositoryDatabase;
let placeOrder: PlaceOrder;
let couponRepository: CouponRepositoryDatabase;
let orderRepository: OrderRepositoryDatabase;
const connectionDb = new MysqlConnectionAdapter();

beforeEach(async () => {
  itemRepository = new ItemRepositoryDatabase(connectionDb);
  couponRepository = new CouponRepositoryDatabase(connectionDb);
  orderRepository = new OrderRepositoryDatabase(connectionDb);
  placeOrder = new PlaceOrder(
    itemRepository,
    orderRepository,
    couponRepository
  );
  await orderRepository.clear();
});

describe('Para criar um pedido', () => {
  test('Deve gerar um pedido com cupom', async () => {
    const input = {
      cpf: '236.746.610-63',
      orderItems: [
        { id_item: 1, quantity: 1 },
        { id_item: 2, quantity: 3 }
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
        { id_item: 1, quantity: 1 },
        { id_item: 2, quantity: 3 }
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
        { id_item: 1, quantity: 1 },
        { id_item: 2, quantity: 3 }
      ],
      date: new Date('2021-12-10')
    };
    const output = await placeOrder.execute(input);
    const total = output.freight ? output.freight + output.total : output.total;
    expect(total).toBe(200);
  });

  test('Deve gerar um pedido com frete fixo', async () => {
    const input = {
      cpf: '236.746.610-63',
      orderItems: [{ id_item: 1, quantity: 1 }],
      date: new Date('2021-12-10'),
      freight: new FixedFreightCalculator()
    };
    const output = await placeOrder.execute(input);
    const total = output.freight ? output.freight + output.total : output.total;
    expect(total).toBe(40);
  });
});
