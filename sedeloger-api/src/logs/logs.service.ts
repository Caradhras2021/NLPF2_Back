import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, getManager, Repository } from 'typeorm';
import { EstimationEntity, RechercheEntity, UserEntity } from './logs.entity';
import { Estimation, Recherche } from './logs.interface';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,

    @InjectRepository(EstimationEntity)
    private estimationRepository: Repository<EstimationEntity>,

    @InjectRepository(RechercheEntity)
    private rechercheRepository: Repository<RechercheEntity>,
  ) {}

  // async postLogs(logs: Logs): Promise<string> {
  //   const currentdate = new Date().toLocaleString();
  //   try {
  //     await this.usersRepository.save({
  //       logins: logs['login'],
  //       email_address: logs['email_address'],
  //     });
  //     await this.estimationRepository.save({
  //       surface: logs['surface'],
  //       pieces: logs['rooms'],
  //       ville: logs['city'],
  //       types: logs['type'],
  //       resultat: logs['resultat'],
  //       dates: currentdate,
  //     });
  //     await this.rechercheRepository.save({
  //       surface: logs['surface'],
  //       pieces: logs['rooms'],
  //       ville: logs['city'],
  //       types: logs['type'],
  //       budget: logs['budget'],
  //       dates: currentdate,
  //     });
  //     return 'logs inserted';
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async estimation(logs: Estimation): Promise<string> {
    const currentdate = new Date().toLocaleString();
    try {
      await this.usersRepository.save({
        logins: logs['login'],
        email_address: logs['email_address'],
      });
      await this.estimationRepository.save({
        surface: logs['surface'],
        pieces: logs['rooms'],
        ville: logs['city'],
        code_postal: logs['code_postal'],
        types: logs['type'],
        resultat: logs['resultat'],
        dates: currentdate,
      });
      return 'logs inserted';
    } catch (error) {
      throw error;
    }
  }

  // async recherche(logs: Recherche): Promise<string> {
  //   const currentdate = new Date().toLocaleString();
  //   try {
  //     const test = await this.usersRepository.findOne({ logins: logs['login'], email_address: logs['email_address'] });
  //     if (test) {
  //       await this.usersRepository.save({
  //         id : test.id,
  //         logins: logs['login'],
  //         email_address: logs['email_address'],
  //       });
  //     }
  //     else {
  //       await this.usersRepository.save({
  //         logins: logs['login'],
  //         email_address: logs['email_address'],
  //       });
  //     }
  //     if (test) {
  //       await this.rechercheRepository.save({
  //         surface: logs['surface'],
  //         pieces: logs['rooms'],
  //         ville: logs['city'],
  //         code_postal: logs['code_postal'],
  //         types: logs['type'],
  //         budget: logs['budget'],
  //         dates: currentdate,
  //         users: test,
  //       });
  //     }
  //     else {
  //       await this.rechercheRepository.save({
  //         surface: logs['surface'],
  //         pieces: logs['rooms'],
  //         ville: logs['city'],
  //         code_postal: logs['code_postal'],
  //         types: logs['type'],
  //         budget: logs['budget'],
  //         dates: currentdate,
  //       });
  //     }
      
  //     return 'logs inserted';
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async recherche(logs: Recherche): Promise<string> {
    const currentdate = new Date().toLocaleString();
    try {
      const test = await this.usersRepository.findOne({ logins: logs['login'], email_address: logs['email_address'] });
      const user = new UserEntity();
      if (test){
        console.log("1");
        const recherche = new RechercheEntity();
        recherche.surface = logs['surface'];
        recherche.pieces = logs['rooms'];
        recherche.ville = logs['city'];
        recherche.types = logs['type'];
        recherche.budget = logs['budget'];
        recherche.dates = currentdate;
        recherche.code_postal = logs['code_postal'];
        recherche.users = test;
        await getConnection().manager.insert(RechercheEntity, recherche);
      }
      else {
        console.log("2");
        user.logins = logs['login'];
        user.email_address = logs['email_address'];
        await getConnection().manager.save(user);

        const recherche = new RechercheEntity();
        recherche.surface = logs['surface'];
        recherche.pieces = logs['rooms'];
        recherche.ville = logs['city'];
        recherche.types = logs['type'];
        recherche.budget = logs['budget'];
        recherche.dates = currentdate;
        recherche.code_postal = logs['code_postal'];
        recherche.users = user;
        await getConnection().manager.insert(RechercheEntity, recherche);
      }
      //console.log(user);

      // const recherche = new RechercheEntity();
      // recherche.surface = logs['surface'];
      // recherche.pieces = logs['rooms'];
      // recherche.ville = logs['city'];
      // recherche.types = logs['type'];
      // recherche.budget = logs['budget'];
      // recherche.dates = currentdate;
      // recherche.code_postal = logs['code_postal'];
      // recherche.users = user;
      // await getConnection().manager.save(recherche);

      
      
      return 'logs inserted';
    } catch (error) {
      throw error;
    }
  }

  async getLogs(): Promise<any> {
    try {
      await this.usersRepository.find({
        where: {

        }
      })
    } catch (error) {
      throw error;
    }
  }
}
