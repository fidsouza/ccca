import CouponRepositoryMemory from '../../../infra/repository/memory/CouponRepositoryMemory';
import ItemRepositoryMemory from '../../../infra/repository/memory/ItemRepositoryMemory';
import OrderRepositoryMemory from '../../../infra/repository/memory/OrderRepositoryMemory';
import PlaceOrder from './PlaceOrder';

describe('Para criar um pedido', () => {
  test('Deve gerar um pedido com cupom', async () => {
    const itemRepository = new ItemRepositoryMemory();
    const couponRepository = new CouponRepositoryMemory();
    const orderRepository = new OrderRepositoryMemory();
    const placeOrder = new PlaceOrder(
      itemRepository,
      orderRepository,
      couponRepository
    );
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
    const itemRepository = new ItemRepositoryMemory();
    const couponRepository = new CouponRepositoryMemory();
    const orderRepository = new OrderRepositoryMemory();
    const placeOrder = new PlaceOrder(
      itemRepository,
      orderRepository,
      couponRepository
    );
    const input = {
      cpf: '236.746.610-63',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 3 }
      ],
      date: new Date('2021-12-10')
    };
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(80);
  });
  test('Deve gerar um pedido com frete default', async () => {
    const itemRepository = new ItemRepositoryMemory();
    const couponRepository = new CouponRepositoryMemory();
    const orderRepository = new OrderRepositoryMemory();
    const placeOrder = new PlaceOrder(
      itemRepository,
      orderRepository,
      couponRepository
    );
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
    expect(total).toBe(90);
  });
});
