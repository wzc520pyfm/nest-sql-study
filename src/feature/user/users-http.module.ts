import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersModule } from './user.module';
import { Module } from '@nestjs/common';

@Module({
  // 只要导入UsersModule即可在提供者中使用@InjectRepository(User)
  imports: [UsersModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UserHttpModule {}
