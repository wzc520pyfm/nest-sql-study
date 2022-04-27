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
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

/**
 * 安装mysql相关依赖库: npm install --save @nestjs/typeorm typeorm mysql2
 */