import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { environments } from './configurations/environments';
import { CommitsModule } from './commits/commits.module';

import config from './configurations/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
      load: [config],
    }),
    CommitsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
