import { LocalAuthGuard } from './core/auth/guards/local-auth.guard';
import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './core/auth/auth.service';
import { JwtAuthGuard } from './core/auth/guards/jwt-auth.guard';
import { Role } from './common/enums/role.enum';
import { Roles } from './common/decorators/roles.decorator';
import { RolesGuard } from './common/guard/roles.guard';
import { Result } from './common/interfaces/result.interface';
import { User } from './feature/user/user.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    const token = await this.authService.login(req.user);
    return { statusCode: 200, message: '登录成功', data: { token } };
  }

  @Post('auth/register')
  async register(@Body() user: User): Promise<Result> {
    await this.authService.register(user);
    return { statusCode: 200, message: '注册成功' };
  }

  @Get('test')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getHello(@Request() req: any): string {
    return this.appService.getHello();
  }
}
