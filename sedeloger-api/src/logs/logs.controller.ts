import { Body, Controller, Get, Post } from '@nestjs/common';
import { Estimation, Recherche } from './logs.interface';
import { LogsService } from './logs.service';

@Controller('/logs')
export class LogsController {
  constructor(private readonly LogsService: LogsService) {}

  @Post('/estimation')
  postEstimation(@Body('logs') logs: Estimation): Promise<string> {
    return this.LogsService.estimation(logs);
  }

  @Post('/recherche')
  postRecherche(@Body('logs') logs: Recherche): Promise<string> {
    return this.LogsService.recherche(logs);
  }

  @Get('/getLogs')
  getLogs(): any {
    return this.LogsService.getLogs();
  }
}
