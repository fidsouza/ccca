import Item from '../../../domain/entity/item';
import ItemRepository from '../../../domain/repository/ItemRepository';
import MysqlConnectionAdapter from '../../orm/ConnectionMysql';
import ItemModel from '../../orm/models/Item.model';

export default class ItemRepositoryDatabase implements ItemRepository {
  constructor(readonly connection: MysqlConnectionAdapter) {
    this.connection = connection;
  }
  async findById(idItem: number): Promise<Item | undefined> {
    const itemData = await this.connection.getModel(ItemModel).findByPk(idItem);
    if (!itemData) return;
    return new Item(
      itemData.getDataValue('id_item'),
      itemData.getDataValue('category'),
      itemData.getDataValue('description'),
      itemData.getDataValue('price'),
      itemData.getDataValue('width'),
      itemData.getDataValue('height'),
      itemData.getDataValue('length'),
      itemData.getDataValue('weight')
    );
  }
}
