import Order from './order';
const desc = 'any description';
const price = 100;
const quantity = 1;

describe('Order tests', () => {
  test('should be a order when three itens and valid cpf', () => {
    const validCpf = '619.443.000-15';
    const newOrder = new Order(validCpf);
    newOrder.addItem(desc, price, quantity);
    newOrder.addItem(desc, price, quantity);
    newOrder.addItem(desc, price, quantity);
    expect(newOrder.totalItems()).toBe(3);
  });
  test('should be a order with invalid cpf', () => {
    const invalidCpf = '111.111.111-11';
    expect(() => new Order(invalidCpf).cpf).toThrow(new Error('Invalid CPF'));
  });
  test('should be a order with discount', () => {
    const validCpf = '619.443.000-15';
    const discountinPercent = 10;
    const newOrder = new Order(validCpf, discountinPercent);
    newOrder.addItem(desc, price, quantity);
    expect(newOrder.getTotal()).toBe(90);
  });
  test('should be a order without discount', () => {
    const validCpf = '619.443.000-15';
    const newOrder = new Order(validCpf);
    newOrder.addItem(desc, price, quantity);
    expect(newOrder.getTotal()).toBe(100);
  });
});
