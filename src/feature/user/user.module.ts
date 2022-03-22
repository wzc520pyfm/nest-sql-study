import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  /**
   * 此模块使用 forFeature() 方法定义在当前范围中注册哪些存储库
   * 这样，就可以使用 @InjectRepository()装饰器将 UsersRepository 注入到 UsersService
   */
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UsersController],
  /**
   * 通过导出整个模块来实现: 在导入TypeOrmModule.forFeature 的模块之外使用存储库
   */
  exports: [TypeOrmModule],
})
export class UsersModule {}
