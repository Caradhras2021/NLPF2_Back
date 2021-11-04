import { Controller, Get, Query } from '@nestjs/common';
import { HomeEntity } from './home.entity';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('one')
  getOne(): Promise<HomeEntity> {
    return this.homeService.getOne();
  }

  @Get('all')
  getAll(): Promise<HomeEntity[]> {
      return this.homeService.getAll();
  }

//   @Get('test')
//   getTest(@Query('valeur_fonciere') valeur_fonciere: number): Promise<HomeEntity[]> {
//       return this.homeService.getTest();
//   }
 }  