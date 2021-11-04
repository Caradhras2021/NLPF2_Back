import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { HomeModule } from './home/home.module';

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()), HomeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
