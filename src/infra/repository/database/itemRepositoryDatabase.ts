import Item from '../../../domain/entity/item';
import ItemRepository from '../../../domain/repository/ItemRepository';
import MysqlConnectionAdapter from '../../database/ConnectionMysql';
import ItemModel from '../../database/models/Item.model';

export class ModelInstance extends ItemModel {}

export default class ItemRepositoryDatabase implements ItemRepository {
  constructor(
    readonly itemModel: typeof ModelInstance = ItemModel,
    readonly connection: MysqlConnectionAdapter
  ) {
    this.connection = connection;
    this.itemModel = itemModel;
  }
  async findById(idItem: number): Promise<Item | undefined> {
    const itemData = await this.itemModel.findByPk(idItem);
    if (!itemData) return;
    return new Item(
      itemData.id_item,
      itemData.category,
      itemData.description,
      itemData.price,
      itemData.width,
      itemData.height,
      itemData.length,
      itemData.weight
    );
  }
}
