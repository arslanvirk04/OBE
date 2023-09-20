require('dotenv').config()
import { Sequelize } from 'sequelize-typescript';
import { models } from 'src/models';
import { SEQUELIZE } from '../core/constants';


const databaseConfig: any = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  logging: false
};

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let sequelize :any = {}
      if (process.env.DATABASE_URL) {
        sequelize = new Sequelize(process.env.DATABASE_URL, databaseConfig);
      } else {
        sequelize = new Sequelize(
          databaseConfig.database,
          databaseConfig.username,
          databaseConfig.password,
          databaseConfig,
        );
      }
      sequelize.addModels(models);
      await sequelize.sync();
      return sequelize;
    },
  },
];
