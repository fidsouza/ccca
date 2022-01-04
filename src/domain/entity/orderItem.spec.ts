import OrderItem from './orderItem';

describe('Testes para o order item', () => {
  test('Deve retornar o total de item', () => {
    const item = new OrderItem(1, 10, 2);
    expect(item.getTotal()).toBe(20);
  });
});
