import Item from '../../../domain/entity/item';
import ItemRepositoryDatabase from '../../../infra/repository/database/itemRepositoryDatabase';
import SimulateFreightInput from './dto/SimulateFreightInput';
import SimulateFreight from './SimulateFreight';
import MysqlConnectionAdapter from '../../../infra/database/orm/ConnectionMysql';
import DefaultFreight from '../../../domain/entity/defaultFreight';

test('Simular um frete de itens', async () => {
  const itemRepository = new ItemRepositoryDatabase(
    new MysqlConnectionAdapter()
  );

  const freightCalculator = new DefaultFreight();
  const simulateFreight = new SimulateFreight(
    itemRepository,
    freightCalculator
  );
  const simulateFreightInput = new SimulateFreightInput([
    { idItem: 1, quantity: 1 },
    { idItem: 2, quantity: 1 }
  ]);
  const freight = await simulateFreight.execute(simulateFreightInput);
  expect(freight.amount).toBe(10);
});

test('Deve retornar um erro caso ao simular um frete de item que não existe.', async () => {
  const itemRepository = new ItemRepositoryDatabase(
    new MysqlConnectionAdapter()
  );
  const freightCalculator = new DefaultFreight();
  const simulateFreightInput = new SimulateFreightInput([
    { idItem: 6, quantity: 1 },
    { idItem: 7, quantity: 1 }
  ]);
  await expect(
    new SimulateFreight(itemRepository, freightCalculator).execute(
      simulateFreightInput
    )
  ).rejects.toThrow(new Error('Item not found'));
});
