import { IsMobilePhone, IsNotEmpty } from 'class-validator';
import { PartialType, PickType, OmitType } from '@nestjs/mapped-types';

/**
 * 这是一个创建用户的DTO
 * 实际上不必重新定义一个类, CreateUserDto实际上是User的一个变体, 对于新增用户,完全可以使用User替代CreateUserDto
 * 但是对于更新用户, 这些属性往往不是全部必填, 而是全部可选, 这时可以使用映射来快速生成新类型
 */
export class CreateUserDto {
  @IsMobilePhone('zh-CN')
  phone: string;
  @IsNotEmpty()
  password: string;
  firstName: string;
  lastName: string;
}

// 使用PartialType来快速生成一个所有属性都可选的类型(其属性与CreateUserDto一致但都是可选的)
export class UpdateUserDto extends PartialType(CreateUserDto) {}

// 使用PickType来从CreateUserDto中挑出一组属性(本例是lastName)来构建一个新类型
export class UpdateUserLastNameDto extends PickType(CreateUserDto, [
  'lastName',
] as const) {}

// 使用OmitType来从CreateUserDto中去除一组属性(本例是lastName)来构建一个新类型
export class UpdateUserDto2 extends OmitType(CreateUserDto, [
  'lastName',
] as const) {}

// IntersectionType可以将两个类型合并成一个类型
// export class UpdateCatDto extends IntersectionType(
//   CreateCatDto,
//   AdditionalCatInfo,
// ) {}

// 这些映射方式是可以组合的, 下例生成的新类型继承了CreateUserDto, 所有属性为可选, 且lastName被剔除了
export class UpdateUserDto3 extends PartialType(
  OmitType(CreateUserDto, ['lastName'] as const),
) {}
