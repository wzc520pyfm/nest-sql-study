import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './common/middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log', 'verbose'], // 日志级别
    cors: true, // 跨域
  });
  app.setGlobalPrefix('api/v1'); // 全局路由前缀
  app.use(logger); // 全局日志中间件
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true, // 禁用详细错误信息(开启后不会再返回详细的错误信息)
      whitelist: true, // 自动去除非白名单内的属性(即验证类中没有声明的属性)
      forbidNonWhitelisted: true, // 开启后, 如果出现非白名单内的属性, 将不再是自动去除而是抛出错误
      transform: true, // 全局开启转换器(默认关闭, 多数情况是在controller层开启)---开启后, '14' => 14
    }),
  ); // 全局启用验证
  // 如果遇到请求实体太大的问题, 可揭开下面的注释
  // app.use(json({ limit: '50mb' }));
  // app.use(urlencoded({ limit: '50mb', extended: true }));
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

/**
 * 安装mysql相关依赖库: pnpm install --save @nestjs/typeorm typeorm mysql2
 * 安装文件上传依赖库: pnpm i -D @types/multer
 * 安装身份认证依赖库: pnpm install --save @nestjs/passport passport passport-local
 *                    pnpm install --save-dev @types/passport-local
 * 安装JWT依赖库:     pnpm install @nestjs/jwt passport-jwt
 *                    pnpm install @types/passport-jwt --save-dev
 * 安装静态服务依赖库: pnpm install --save @nestjs/serve-static
 * 安装验证管道依赖库: pnpm i --save class-validator class-transformer
 * 安装工具库: pnpm install dayjs --save // 安装日期格式化库
 */
