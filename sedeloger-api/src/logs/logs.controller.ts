import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserEntity } from './logs.entity';
import { Logs } from './logs.interface';
import { LogsService } from './logs.service';

@Controller('/logs')
export class LogsController {
  constructor(private readonly LogsService: LogsService) {}

  @Post('/')
  postLogs(@Body('logs') logs: Logs): Promise<UserEntity> {
    return this.LogsService.postLogsService(logs);
  }

  @Get('/')
  getLogs(): any {
    return this.LogsService.getLogs();
  }
}
