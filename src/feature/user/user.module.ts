import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { CommonModule } from 'src/common/common.module';

@Module({
  /**
   * 此模块使用 forFeature() 方法定义在当前范围中注册哪些存储库
   * 这样，就可以使用 @InjectRepository()装饰器将 UsersRepository 注入到 UsersService
   */
  imports: [TypeOrmModule.forFeature([User]), CommonModule],
  providers: [
    UsersService,
    // 在整个模块中开启token校验和鉴权  -- !注意: 如果有其他模块希望访问此模块export的service也会先经过校验
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
  controllers: [UsersController],
  /**
   * 通过导出整个模块来实现: 在导入TypeOrmModule.forFeature 的模块之外使用存储库
   */
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
