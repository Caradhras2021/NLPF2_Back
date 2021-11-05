import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AveragePrice, SelogerFilters } from './home.interface';
import { HomeEntity } from './home.entity';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(HomeEntity)
    private usersRepository: Repository<HomeEntity>,
  ) {}

  async getByFilters(filter: SelogerFilters): Promise<HomeEntity[]> {
    try {
      const res = await this.usersRepository.find({ where: filter });
      return res;
    } catch (error) {
      throw error;
    }
  }

  async getAveragePrice(filter: SelogerFilters): Promise<number> {
    try{
      const res = await this.usersRepository.find({ where: filter });
      let totalSurface: number = 0;
      let totalPrice: number = 0;
      res.forEach(elt => {
        totalSurface += +(elt.lot1_surface_carrez);
        totalPrice += +(elt.valeur_fonciere);
      });

      return Math.round(totalPrice / totalSurface);
    }catch (error){
      throw error;
    }
  }

  checkFilters(filter: SelogerFilters): SelogerFilters {
    return this.usersRepository.findOne();
  }

  async getAveragePriceHouse(filter: SelogerFilters): Promise<AveragePrice> {
    try{
      const res = await this.usersRepository.find({ where: filter });
      let totalSurface: number = 0;
      let totalPrice: number = 0;
      res.forEach(elt => {
        totalSurface += +(elt.lot1_surface_carrez);
        totalPrice += +(elt.valeur_fonciere);
      });

      return Math.round(totalPrice / totalSurface);
    }catch (error){
      throw error;
    }
  }

  async getEstimationPrice(filter: SelogerFilters): Promise<number> {
    try{
      const res = await this.usersRepository.find({ where: filter });
      let totalSurface: number = 0;
      let totalPrice: number = 0;
      res.forEach(elt => {
        totalSurface += +(elt.lot1_surface_carrez);
        totalPrice += +(elt.valeur_fonciere);
      });

      return Math.round(totalPrice / totalSurface);
    }catch (error){
      throw error;
    }
  }

  getOne(): Promise<HomeEntity> {
    return this.usersRepository.findOne();
  }

  getAll(): Promise<HomeEntity[]> {
    return this.usersRepository.find();
  }
}
