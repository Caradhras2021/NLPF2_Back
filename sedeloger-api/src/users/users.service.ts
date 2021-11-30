import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
import { Users } from './users.interface';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private usersRepository: Repository<UsersEntity>,
    ){}

    async createUser(users: Users): Promise<UsersEntity> {
        try {
            let exist = await this.usersRepository.findOne({
                where: { email_address: users['email_address'] }
            })
            exist = await this.usersRepository.findOne({
                where: { email_address: users['email_address'] }
            })
            if (exist){
                const res = await this.usersRepository.save({
                    id: exist.id,
                    email_address: users['email_address'],
                    password: users['password'],
                })
                return res;
            }
            else{
                const res = await this.usersRepository.save({
                    email_address: users['email_address'],
                    password: users['password'],
                })
                return res;
            }
        } catch (error) {
            throw error;
        }
    }

    async getUser(email_address: string): Promise<UsersEntity> {
        return await this.usersRepository.findOne({
            where: { email_address: email_address }


            
        })
    }
}
