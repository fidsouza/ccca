import { Sequelize } from 'sequelize-typescript';
import Connection from './Connection';
import ItemModel from './models/Item.model';

export default class MysqlConnectionAdapter implements Connection {
  readonly mysql: Sequelize;

  constructor() {
    this.mysql = new Sequelize({
      host: process.env.DB_HOST,
      database: process.env.DATABASE,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: +process.env.DB_PORT! || 3306,
      dialect: process.env.DB_DIALECT as any,
      logging: false
    });
    this.mysql.addModels([ItemModel]);
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
