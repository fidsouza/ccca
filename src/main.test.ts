import axios from 'axios';
import MysqlConnectionAdapter from './infra/database/orm/ConnectionMysql';
import OrderRepositoryDatabase from './infra/repository/database/OrderRepositoryDatabase';

let connection = new MysqlConnectionAdapter();

beforeEach(async () => {
  await new OrderRepositoryDatabase(connection).clear();
});

test('deve criar um pedido usando API /orders', async () => {
  const output = await axios({
    url: 'http://localhost:3000/orders',
    method: 'POST',
    data: {
      cpf: '839.435.452-10',
      date: '2021-12-10',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 }
      ]
    }
  });
  expect(output.data.total).toBe(110);
});

test('Deve testar a API /simulateFreight (POST)', async function () {
  const response = await axios({
    url: 'http://localhost:3000/simulateFreight',
    method: 'post',
    data: {
      items: [
        {
          idItem: 4,
          quantity: 1
        },
        {
          idItem: 5,
          quantity: 1
        },
        {
          idItem: 6,
          quantity: 3
        }
      ]
    }
  });
  const output = response.data;
  expect(output.amount).toBe(260);
});

afterAll(async () => {
  await new OrderRepositoryDatabase(connection).clear();
});
