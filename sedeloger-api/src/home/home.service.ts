import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SelogerFilters } from './home.controller';
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

  getOne(): Promise<HomeEntity> {
    return this.usersRepository.findOne();
  }

  getAll(): Promise<HomeEntity[]> {
    return this.usersRepository.find();
  }
}
