import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  AveragePrice,
  DeltaPrice,
  InflationRate,
  SelogerFilters,
} from './home.interface';
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
    try {
      const res = await this.usersRepository.find({ where: filter });
      let totalSurface = 0;
      let totalPrice = 0;
      res.forEach((elt) => {
        totalSurface += +elt.lot1_surface_carrez;
        totalPrice += +elt.valeur_fonciere;
      });

      return Math.round(totalPrice / totalSurface);
    } catch (error) {
      throw error;
    }
  }

  checkLocalTypeFilters = (
    filter: SelogerFilters,
    typeLocal: string,
  ): SelogerFilters => {
    if (filter.type_local && filter.type_local == typeLocal) {
      return filter;
    }
    filter.type_local = typeLocal;
    return filter;
  };

  trustIndexCalculator(delta: DeltaPrice, nbResult: number): number {
    const average = (delta.min * 100) / delta.max;
    const ponderationNbRes = 1.1 * (nbResult / 10);
    const res = average + ponderationNbRes;
    if (res > 100) {
      return 99;
    }
    return Math.round(res);
  }

  async getAveragePriceHouse(filter: SelogerFilters): Promise<AveragePrice> {
    try {
      filter = this.checkLocalTypeFilters(filter, 'Maison');
      const res = await this.usersRepository.find({
        where: filter,
      });
      let totalSurface = 0;
      let totalPrice = 0;
      let totalResponse = 0;
      const delta: DeltaPrice = { min: 999999, max: 0 };
      res.forEach((elt) => {
        const sizeCarrez = +elt.lot1_surface_carrez;
        const price = +elt.valeur_fonciere;
        if (sizeCarrez !== 0 && price !== 0) {
          totalResponse += 1;
          totalSurface += sizeCarrez;
          totalPrice += price;
          const currAveragePrice = price / sizeCarrez;
          if (delta.min > currAveragePrice) {
            delta.min = Math.round(currAveragePrice);
          } else if (delta.max < currAveragePrice) {
            delta.max = Math.round(currAveragePrice);
          }
        }
      });

      const deltaRes = this.trustIndexCalculator(delta, totalResponse);

      const averagePriceRes: AveragePrice = {
        localType: 'Maison',
        averagePrice: Math.round(totalPrice / totalSurface),
        trustIndex: deltaRes,
        nbResult: totalResponse,
        deltaMinMax: delta,
      };

      return averagePriceRes;
    } catch (error) {
      throw error;
    }
  }

  async getAveragePriceApartment(
    filter: SelogerFilters,
  ): Promise<AveragePrice> {
    try {
      filter = this.checkLocalTypeFilters(filter, 'Appartement');
      const res = await this.usersRepository.find({
        where: filter,
      });
      let totalSurface = 0;
      let totalPrice = 0;
      let totalResponse = 0;
      const delta: DeltaPrice = { min: 999999, max: 0 };
      res.forEach((elt) => {
        const sizeCarrez = +elt.lot1_surface_carrez;
        const price = +elt.valeur_fonciere;
        if (sizeCarrez !== 0 && price !== 0) {
          totalResponse += 1;
          totalSurface += sizeCarrez;
          totalPrice += price;
          const currAveragePrice = price / sizeCarrez;
          if (delta.min > currAveragePrice) {
            delta.min = Math.round(currAveragePrice);
          } else if (delta.max < currAveragePrice) {
            delta.max = Math.round(currAveragePrice);
          }
        }
      });

      const deltaRes = this.trustIndexCalculator(delta, totalResponse);

      const averagePriceRes: AveragePrice = {
        localType: 'Appartment',
        averagePrice: Math.round(totalPrice / totalSurface),
        trustIndex: deltaRes,
        nbResult: totalResponse,
        deltaMinMax: delta,
      };

      return averagePriceRes;
    } catch (error) {
      throw error;
    }
  }

  async getEstimationPrice(filter: SelogerFilters): Promise<number> {
    try {
      const res = await this.usersRepository.find({ where: filter });
      let totalSurface = 0;
      let totalPrice = 0;
      res.forEach((elt) => {
        totalSurface += +elt.lot1_surface_carrez;
        totalPrice += +elt.valeur_fonciere;
      });

      return Math.round(totalPrice / totalSurface);
    } catch (error) {
      throw error;
    }
  }

  async getInflationRate(filter: SelogerFilters): Promise<InflationRate> {
    try {
      const transactions = await this.usersRepository.find({ where: filter });
      let totalPrice2019 = 0;
      let totalSurface2019 = 0;
      let totalPrice2020 = 0;
      let totalSurface2020 = 0;

      // Get the price and surface of the first and last transactions
      transactions.forEach((elt) => {
        let currPrice = +elt.valeur_fonciere;
        let currSurface = +elt.lot1_surface_carrez;

        // Check if this transaction should be taken into account
        if (currPrice != 0 && currSurface !=0) {
          
          if (elt.date_mutation.getFullYear() == 2019) {
              totalPrice2019 += +elt.valeur_fonciere;
              totalSurface2019 += +elt.lot1_surface_carrez;
          }

          if (elt.date_mutation.getFullYear() == 2020) {
            totalPrice2020 += +elt.valeur_fonciere;
            totalSurface2020 += +elt.lot1_surface_carrez;
          }
        }
      });

      let pricePerSquareMeter2019 = 0;
      let pricePerSquareMeter2020 = 0;
      let inflationRate = 0;

      // Compute the price per square meter of 2019 and 2020 transactions
      if (totalPrice2019 != 0 && totalSurface2019 != 0) {
        pricePerSquareMeter2019 = Math.round(totalPrice2019 / totalSurface2019);
      }
      
      if (totalPrice2020 != 0 && totalSurface2020 != 0) {
        pricePerSquareMeter2020 = Math.round(totalPrice2020 / totalSurface2020);
      }

      if (pricePerSquareMeter2019 != 0 && pricePerSquareMeter2020 != 0) {
        inflationRate = +(pricePerSquareMeter2020 / pricePerSquareMeter2019 * 100 - 100).toFixed(2);
      }


      const result: InflationRate = {
        averagePrice2019: pricePerSquareMeter2019,
        averagePrice2020: pricePerSquareMeter2020,
        inflationPrice: pricePerSquareMeter2020 - pricePerSquareMeter2019,
        inflationRate: inflationRate,
      };

      return result;
    } catch (error) {
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
