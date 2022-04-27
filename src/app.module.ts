import { UsersModule } from './feature/user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhotoModule } from './feature/photo/photo.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guard/roles.guard';
import { AuthModule } from './core/auth/auth.module';
import { JwtAuthGuard } from './core/auth/guards/jwt-auth.guard';

@Module({
  // 将 TypeOrmModule 导入AppModule,并使用ormconfig.json中的配置(其中entities - 要加载并用于此连接的实体。接受要加载的实体类和目录路径, synchronize - 指示是否在每次应用程序启动时自动创建数据库架构,生成环境下请务必设为false, 设置autoLoadEntities为true即可自动载入实体---每个通过forFeature()注册的实体都会自动添加到配置对象的entities数组中)
  imports: [TypeOrmModule.forRoot(), UsersModule, PhotoModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    // 可以全局注册jwt鉴权守卫和权限守卫, 这样就无需再每个端点都注册, 但要注意的是一定要在JwtAuthGuard之后注册RolesGuard(因为roles是在token校验后才添加到req上的)
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class AppModule {
  // 注入TypeORM 的Connection对象
  constructor(private readonly connection: Connection) {}
}
