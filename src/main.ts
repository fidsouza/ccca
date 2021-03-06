import MysqlConnectionAdapter from './infra/database/orm/ConnectionMysql';
import ExpressAdapter from './infra/http/ExpressAdapter';
import RouteConfig from './infra/http/RouteConfig';
import DatabaseRepositoryFactory from './infra/repository/factory/DatabaseRepositoryFactory';
import OrderDAODatabase from './infra/dao/OrderDAODatabase';

try {
  const connection = new MysqlConnectionAdapter();
  const repositoryFactory = new DatabaseRepositoryFactory(connection);
  const orderDAO = new OrderDAODatabase(connection);
  const expressAdapter = new ExpressAdapter();
  new RouteConfig(expressAdapter, repositoryFactory, orderDAO);

  expressAdapter.listen(3000);
} catch (error) {
  console.log(error);
}
