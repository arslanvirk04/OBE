import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'
import { TransactionInterceptor } from './database/transaction.interceptor';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  // app.useGlobalInterceptors(new TransactionInterceptor());
  await app.listen(4500);
}
bootstrap();
