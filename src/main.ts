import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './configs /configuration.config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true , whitelist: true}));
  const config_service = app.get(ConfigService); 
  console.log(config_service.get<DatabaseConfig>('database'));

  const config = new DocumentBuilder()
    .setTitle('Card shop')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('card')
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(3000);
}
bootstrap();
