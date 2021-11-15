import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsController } from './logs.controller';
import { EstimationEntity, RechercheEntity, UserEntity } from './logs.entity';
import { LogsService } from './logs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, EstimationEntity, RechercheEntity]),
  ],
  exports: [TypeOrmModule],
  providers: [LogsService],
  controllers: [LogsController],
})
export class LogsModule {}
