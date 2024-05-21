import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { CardModule } from './modules/card/card.module';
import { AuthModule } from './modules/auth/auth.module';
import { database_config } from './configs /configuration.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision','staging').default('development'),
        PORT: Joi.number().port().default(3000),
      },
    ),
    validationOptions: {
      abortEarly: false,
    },
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env',
      load: [database_config]
    }),
    UserModule,
    CardModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
