import { Body, Controller, Get, Post } from '@nestjs/common';
import { HomeEntity } from './home.entity';
import { AveragePrice, SelogerFilters } from './home.interface';
import { HomeService } from './home.service';

@Controller('/home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('/one')
  getOne(): Promise<HomeEntity> {
    return this.homeService.getOne();
  }

  @Get('/all')
  getAll(): Promise<HomeEntity[]> {
    return this.homeService.getAll();
  }

  @Post('/testFilters')
  getTestFilters(
    @Body('filters') filters: SelogerFilters,
  ): Promise<HomeEntity[]> {
    const data = this.homeService.getByFilters(filters);
    return data;
  }

  @Post('/averagePrice')
  getAveragePrice(
    @Body('filters') filters: SelogerFilters,
  ): Promise<number> {
    const data = this.homeService.getAveragePrice(filters);
    return data;
  }

  @Post('/averagePrice/house')
  getAveragePriceHouse(
    @Body('filters') filters: SelogerFilters,
  ): Promise<AveragePrice> {
    const data = this.homeService.getAveragePriceHouse(filters);
    return data;
  }

  @Post('/estimationPrice')
  getEstimationPrice(
    @Body('filters') filters: SelogerFilters,
  ): Promise<number> {
    const data = this.homeService.getEstimationPrice(filters);
    return data;
  }
}
