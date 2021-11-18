import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserEntity } from './logs.entity';
import { Logs, SignIn } from './logs.interface';
import { LogsService } from './logs.service';

@Controller('/logs')
export class LogsController {
  constructor(private readonly LogsService: LogsService) {}

  @Post('/')
  postLogs(@Body('logs') logs: Logs): Promise<UserEntity> {
    return this.LogsService.postLogsService(logs);
  }

  @Get('/allLogs')
  getLogs(): Promise<UserEntity[]> {
    return this.LogsService.getAllLogs();
  }

  @Post('/userLogs')
  getUserLogs(@Body('signIn') signIn: SignIn): Promise<UserEntity[]> {
    return this.LogsService.getUserLogs(signIn);
  }
}
