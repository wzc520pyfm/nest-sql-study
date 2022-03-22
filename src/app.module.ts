import { UsersModule } from './feature/user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  // 将 TypeOrmModule 导入AppModule,并使用ormconfig.json中的配置(其中entities - 要加载并用于此连接的实体。接受要加载的实体类和目录路径, synchronize - 指示是否在每次应用程序启动时自动创建数据库架构,生成环境下请务必设为false)
  imports: [
    TypeOrmModule.forRoot({
      autoLoadEntities: true, // 设置自动载入实体---每个通过forFeature()注册的实体都会自动添加到配置对象的entities数组中
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // 注入TypeORM 的Connection对象
  constructor(private readonly connection: Connection) {}
}
