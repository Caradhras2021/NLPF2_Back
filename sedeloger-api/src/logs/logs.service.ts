import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, getManager, Repository } from 'typeorm';
import { UserEntity } from './logs.entity';
import { Logs, SignIn } from './logs.interface';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}



  
  async postLogsService(logs: Logs): Promise<UserEntity> {
    const currentdate = new Date().toLocaleString();
    try {
      const resp = await this.usersRepository.save({
        logins: logs['login'],
        email_address: logs['email_address'],
        surface: logs['surface'],
        pieces: logs['rooms'],
        ville: logs['city'],
        code_postal: logs['code_postal'],
        types: logs['type'],
        resultat: logs['resultat'],
        type_research: logs['typeResearch'],
        budget: logs['budget'],
        dates: currentdate,
      });
      return resp;
    } catch (error) {
      throw error;
    }
  }

  async getUserLogs(signIn: SignIn): Promise<UserEntity[]> {
    try {
      const usersResearch = await this.usersRepository.find({
        where: {
          logins: signIn['login'],
          email_address: signIn['email_address'],
        },
      });
      return usersResearch;
    } catch (error) {
      throw error;
    }
  }

  async getAllLogs(): Promise<UserEntity[]> {
    try {
      const usersResearch = await this.usersRepository.find();
      return usersResearch;
    } catch (error) {
      throw error;
    }
  }
}
