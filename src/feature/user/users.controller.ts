import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { Result } from 'src/common/interfaces/result.interface';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('/users')
@UseGuards(JwtAuthGuard, RolesGuard) // 对此controller层的所有节点开启token校验和鉴权
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @Roles(Role.ADMIN)
  async getAllUsers(): Promise<Result> {
    const data = await this.usersService.findAll();
    return { statusCode: 200, message: '获取成功', data };
  }

  @Post('/')
  async createOne(
    // 默认201: 已创建。成功请求并创建了新的资源
    @Body() user: User,
  ): Promise<Result> {
    await this.usersService.createOne(user);
    return { statusCode: 200, message: '创建成功' };
  }

  @Get('/:id')
  async getOne(@Param('id') id: number): Promise<Result> {
    const data = await this.usersService.findOne(id);
    return { statusCode: 200, message: '获取成功', data };
  }

  @Put('/:id')
  async updateOne(
    @Param('id') id: number,
    @Body() user: User,
  ): Promise<Result> {
    await this.usersService.updateOne(id, user);
    return { statusCode: 200, message: '更新成功' };
  }

  @Delete('/:id')
  async removeOne(@Param('id') id: number): Promise<Result> {
    await this.usersService.removeOne(id);
    return { statusCode: 200, message: '删除成功' };
  }

  @Post('/many')
  async createMany(@Body() users: Array<User>): Promise<Result> {
    await this.usersService.createMany(users);
    return { statusCode: 200, message: '创建成功' };
  }
}
