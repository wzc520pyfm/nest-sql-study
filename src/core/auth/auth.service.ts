import { HttpException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CryptoUtil } from 'src/common/utils/crypto.util';
import { CreateUserDto } from 'src/entities/create-user.dto';
import { User } from 'src/feature/user/user.entity';
import { UsersService } from 'src/feature/user/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(CryptoUtil) private readonly cryptoUtil: CryptoUtil,
  ) {}

  // 校验密码是否正确, 并返回用户信息(不包含密码)
  async validateUser(phone: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByPhone(phone);
    if (!user) throw new HttpException('登录账号有误', 406);
    if (!this.cryptoUtil.checkPassword(pass, user.password))
      throw new HttpException('登录密码有误', 406);
    const { password, ...result } = user; // 解构赋值, result为去除password后的user
    return result;
  }

  async login(user: any) {
    const payload = { phone: user.phone, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // 注册
  async register(createUserDto: CreateUserDto): Promise<void> {
    return await this.usersService.createOne(createUserDto as User);
  }
}
