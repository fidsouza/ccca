import MysqlConnectionAdapter from './ConnectionMysql';

test('deve se connectar ao banco de dados', async () => {
  const connection = new MysqlConnectionAdapter();
  expect(await connection.isConnected()).toBe('Connection successfull');
});
