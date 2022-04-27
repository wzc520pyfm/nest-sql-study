import { IsMobilePhone, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsMobilePhone('zh-CN')
  phone: string;
  @IsNotEmpty()
  password: string;
  firstName: string;
  lastName: string;
}