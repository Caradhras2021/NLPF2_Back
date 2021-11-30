import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'login' })
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email_address: string;





  @Column()
  password: string;
}