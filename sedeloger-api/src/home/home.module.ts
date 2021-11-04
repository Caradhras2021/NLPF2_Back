import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { HomeController } from './home.controller';
import { HomeEntity } from './home.entity';
import { HomeService } from './home.service';

@Module({
    imports:[TypeOrmModule.forFeature([HomeEntity])],
    exports: [TypeOrmModule],
    providers: [HomeService],
    controllers: [HomeController]
})
export class HomeModule {}