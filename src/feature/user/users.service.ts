import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  /**
   * 注入对象
   * @param usersRepository User实体
   * @param connection 通过它来使用QueryRunner类, 进而处理事务
   */
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private connection: Connection,
  ) {}

  findAll(): Promise<Array<User>> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.query(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  // 不推荐使用装饰器来控制事务(@Transaction()和@TransactionManager())
  // 创建一个事务
  async createMany(users: Array<User>) {
    const queryRunner = this.connection.createQueryRunner();

    // 获取连接
    await queryRunner.connect();
    // 开始一个事务
    await queryRunner.startTransaction();
    try {
      // 执行一些操作
      await queryRunner.manager.save(users[0]);
      await queryRunner.manager.save(users[1]);

      // 提交事务
      await queryRunner.commitTransaction();
    } catch (err) {
      // 如果遇到错误, 则回滚事务
      await queryRunner.rollbackTransaction();
    } finally {
      // 你需要手动实例化并部署一个queryRunner
      await queryRunner.release();
    }
  }
  // 或者直接使用一个Connection对象的回调函数的风格的transaction方法
  async createMany2(users: Array<User>) {
    await this.connection.transaction(async (manager) => {
      await manager.save(users[0]);
      await manager.save(users[1]);
    });
  }
}
