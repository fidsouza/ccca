import Coupon from './coupon';
import Item from './item';
import Order from './order';

const desc = 'any description';
const price = 100;
const quantity = 1;
const validCpf = '619.443.000-15';

describe('Order tests', () => {
  test('should be a order when three itens and valid cpf', () => {
    const newOrder = new Order(validCpf, new Date('2021-12-12'));
    newOrder.addItem(new Item(1, 'INSTRUMENTO', desc, price), quantity);
    newOrder.addItem(new Item(2, 'INSTRUMENTO', desc, price), quantity);
    newOrder.addItem(new Item(3, 'INSTRUMENTO', desc, price), quantity);
    expect(newOrder.totalItems()).toBe(3);
  });
  test('should be a order with invalid cpf', () => {
    const invalidCpf = '111.111.111-11';
    expect(() => new Order(invalidCpf, new Date('2021-12-12'))).toThrow(
      new Error('Invalid CPF')
    );
  });
  test('should be a order with discount', () => {
    const newOrder = new Order(validCpf, new Date('2021-12-12'));
    newOrder.addItem(new Item(1, 'INSTRUMENTO', desc, price), quantity);
    newOrder.addCoupon(new Coupon('VALE10', 10, new Date('2021-12-21')));
    expect(newOrder.getTotal()).toBe(90);
  });
  test('should be a order without discount', () => {
    const newOrder = new Order(validCpf, new Date('2021-12-12'));
    newOrder.addItem(new Item(1, 'INSTRUMENTO', desc, price), quantity);
    expect(newOrder.getTotal()).toBe(100);
  });
  test('Deve fazer um pedido com frete default', () => {
    const newOrder = new Order(validCpf, new Date('2021-12-12'));
    newOrder.addItem(new Item(1, 'INSTRUMENTO', desc, price), quantity);
    newOrder.addItem(
      new Item(2, 'INSTRUMENTO', desc, price, 20, 16, 22, 2),
      quantity
    );
    newOrder.addItem(
      new Item(3, 'INSTRUMENTO', desc, price, 11, 8, 17, 1),
      quantity
    );
    const freight = newOrder.getFreight();
    expect(freight).toBe(30);
  });

  test('Deve fazer um pedido com codigo', () => {
    const newOrder = new Order(validCpf, new Date('2021-12-12'));
    newOrder.addItem(new Item(1, 'INSTRUMENTO', desc, price), quantity);
    newOrder.addItem(
      new Item(2, 'INSTRUMENTO', desc, price, 20, 16, 22, 2),
      quantity
    );
    newOrder.addItem(
      new Item(3, 'INSTRUMENTO', desc, price, 11, 8, 17, 1),
      quantity
    );
    expect(newOrder.getOrder()).toBe('202100000001');
  });
});
