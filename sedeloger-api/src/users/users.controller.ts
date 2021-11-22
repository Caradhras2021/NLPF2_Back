import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Users } from './users.interface';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity'
import { UserEntity } from 'src/logs/logs.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly UsersService: UsersService){}

    @Post('/')
    createUser(@Body('users') users: Users): Promise<UsersEntity> {
        return this.UsersService.createUser(users);
    }

    @Get('/:email_address')
    getUser(@Param('email_address') email_address: string): Promise<UsersEntity> {
        return this.UsersService.getUser(email_address);
    }
}
