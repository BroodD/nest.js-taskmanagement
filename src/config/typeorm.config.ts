import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from '../tasks/task.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: '1234',
  database: 'taskmanagement',
  entities: [__dirname + '../**/*.entity.ts', Task],
  synchronize: true,
};
