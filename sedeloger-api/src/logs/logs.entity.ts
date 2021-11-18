import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  @PrimaryColumn()
  id: number;

  @Column()
  logins: string;

  @Column()
  email_address: string;

  @Column()
  type_research: string;

  @Column({
    nullable: true,
  })
  surface: number;

  @Column({
    nullable: true,
  })
  pieces: number;

  @Column({
    nullable: true,
  })
  ville: string;

  @Column({
    nullable: true,
  })
  types: string;

  @Column()
  dates: string;

  @Column({
    nullable: true,
  })
  code_postal: string;

  @Column({
    nullable: true,
  })
  resultat: number;

  @Column({
    nullable: true,
  })
  budget: number;
}
