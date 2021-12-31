import Item from '../../../domain/entity/item';
import ItemRepositoryDatabase from '../../../infra/repository/database/itemRepositoryDatabase';
import ItemRepositoryMemory from '../../../infra/repository/memory/ItemRepositoryMemory';
import SimulateFreightInput from './dto/SimulateFreightInput';
import SimulateFreight from './SimulateFreight';
import MysqlConnectionAdapter from '../../../infra/database/ConnectionMysql';
import ItemModel from '../../../infra/database/models/Item.model';

test('Simular um frete de itens', async () => {
  const itemRepository = new ItemRepositoryDatabase(
    ItemModel,
    new MysqlConnectionAdapter()
  );
  const item1 = new Item(1, 'DVD', 'LAGOA AZUL', 20);
  const item2 = new Item(2, 'DVD', 'BATMAN', 10);
  const items = [item1, item2];
  const simulateFreight = new SimulateFreight(itemRepository);
  const simulateFreightInput = new SimulateFreightInput(items);
  const freight = await simulateFreight.execute(simulateFreightInput);
  expect(freight.amount).toBe(20);
});

test('Deve retornar um erro caso ao simular um frete de item que não existe.', async () => {
  const itemRepository = new ItemRepositoryMemory();
  const item1 = new Item(6, 'DVD', 'LAGOA AZUL', 20);
  const item2 = new Item(7, 'DVD', 'BATMAN', 10);
  const items = [item1, item2];
  const simulateFreightInput = new SimulateFreightInput(items);
  await expect(
    new SimulateFreight(itemRepository).execute(simulateFreightInput)
  ).rejects.toThrow(new Error('Item not found'));
});
