import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './configs /configuration.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config_service = app.get(ConfigService); 
  console.log(config_service.get<DatabaseConfig>('database'));
  await app.listen(3000);
}
bootstrap();
