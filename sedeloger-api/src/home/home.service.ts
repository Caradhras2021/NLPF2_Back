import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HomeEntity } from './home.entity';
import { Query } from '@nestjs-query/core';
import { from } from 'rxjs';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(HomeEntity)
    private usersRepository: Repository<HomeEntity>,
  ) {}

  getOne(): Promise<HomeEntity> {
    return this.usersRepository.findOne();
  }

  getAll(): Promise<HomeEntity[]> {
    return this.usersRepository.find();
  }
}