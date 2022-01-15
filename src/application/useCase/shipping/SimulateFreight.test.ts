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
  const item1 = new Item(1, 'DVD', 'LAGOA AZUL', 20);
  const item2 = new Item(2, 'DVD', 'BATMAN', 10);
  const items = [item1, item2];
  const freightCalculator = new DefaultFreight();
  const simulateFreight = new SimulateFreight(
    itemRepository,
    freightCalculator
  );
  const simulateFreightInput = new SimulateFreightInput(items);
  const freight = await simulateFreight.execute(simulateFreightInput);
  expect(freight.amount).toBe(10);
});

test('Deve retornar um erro caso ao simular um frete de item que não existe.', async () => {
  const itemRepository = new ItemRepositoryDatabase(
    new MysqlConnectionAdapter()
  );
  const item1 = new Item(6, 'DVD', 'LAGOA AZUL', 20);
  const item2 = new Item(7, 'DVD', 'BATMAN', 10);
  const items = [item1, item2];
  const freightCalculator = new DefaultFreight();
  const simulateFreightInput = new SimulateFreightInput(items);
  await expect(
    new SimulateFreight(itemRepository, freightCalculator).execute(
      simulateFreightInput
    )
  ).rejects.toThrow(new Error('Item not found'));
});
