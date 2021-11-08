import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import {
  AveragePrice,
  CreditCompute,
  CreditInfos,
  CreditResults,
  DeltaPrice,
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

  recalculateFilters(creditInfos: CreditInfos): CreditCompute {
    const priceMax = creditInfos.apport * 10;
    const mensualiteMax = creditInfos.salaire * 0.3;
    const montantCredit = priceMax - creditInfos.apport;
    const dureeMin = montantCredit / mensualiteMax;
    const result: CreditCompute = {
      priceMax: priceMax,
      mensualiteMax: mensualiteMax,
      montantCreditMax: montantCredit,
      dureeMin: dureeMin,
      dureeMinYear: Math.round(dureeMin / 12),
    };
    return result;
  }

  async getCredit(
    filters: SelogerFilters,
    creditInfos: CreditInfos,
  ): Promise<CreditResults> {
    try {
      const creditCompute = this.recalculateFilters(creditInfos);
      const newFilters = {}; // stock previous filter and compute the new valeur_fonciere
      for (const attribut in filters) {
        newFilters[attribut] = filters[attribut];
      }
      newFilters['valeur_fonciere'] = Between(
        creditCompute.priceMax * 0.8,
        creditCompute.priceMax,
      );
      const homeEntitiesRes = await this.usersRepository.find({
        where: newFilters,
      });
      const res: CreditResults = {
        creditInfos: creditCompute,
        homeEntities: homeEntitiesRes,
      };
      return res;
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

  getOne(): Promise<HomeEntity> {
    return this.usersRepository.findOne();
  }

  getAll(): Promise<HomeEntity[]> {
    return this.usersRepository.find();
  }
}
