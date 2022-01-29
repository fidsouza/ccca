require('dotenv').config();
import { Sequelize, ModelCtor, Model } from 'sequelize-typescript';
import Connection from './Connection';
import CouponModel from './models/coupon.model';
import ItemModel from './models/Item.model';
import OrderModel from './models/order.model';
import OrderItemModel from './models/orderItem.model';
import { test, development, production } from './config/database-config';

export default class MysqlConnectionAdapter implements Connection {
  private mysql: Sequelize;

  constructor() {
    this.mysql = new Sequelize({
      host: process.env.DB_HOST,
      database:
        process.env.NODE_ENV === 'test'
          ? test.database
          : development.database || production.database,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: +process.env.DB_PORT! || 3306,
      dialect: (process.env.DB_DIALECT as any) || 'mysql',
      logging: false
    });
    this.addModels([ItemModel, CouponModel, OrderModel, OrderItemModel]);
  }
  private addModels(models: ModelCtor[]) {
    this.mysql.addModels(models);
  }
  public getModel(modelName: ModelCtor): ModelCtor<Model<any, any>> {
    return this.mysql.models[modelName.name] as ModelCtor<Model<any, any>>;
  }
  public async isConnected(): Promise<String> {
    try {
      await this.mysql.authenticate();
      return 'Connection successfull';
    } catch (error) {
      console.error(error);
      throw new Error('Unable to connect to the database');
    }
  }
}
