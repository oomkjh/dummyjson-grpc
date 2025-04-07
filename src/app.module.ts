import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TransformService } from './transform/transform.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, TransformService],
})
export class AppModule {}
