import { Body, Controller, Get, Post } from '@nestjs/common';
import { HomeEntity } from './home.entity';
import { HomeService } from './home.service';

export interface SelogerFilters {
  date_mutation?: Date;
  valeur_fonciere?: number;
  adresse_numero?: number;
  adresse_nom_voie?: string;
  code_postal?: number;
  nom_commune?: string;
  lot1_surface_carrez?: number;
  type_local?: string;
  nombre_pieces_principales?: number;
  longitude?: number;
  latitude?: number;
}
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

  @Post('/averagePriceHouse')
  getAveragePriceHouse(
    @Body('filters') filters: SelogerFilters,
  ): Promise<HomeEntity[]> {
    const data = this.homeService.getByFilters(filters);
    return data;
  }
}
