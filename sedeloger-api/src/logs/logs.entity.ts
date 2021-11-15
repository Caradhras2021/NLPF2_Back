import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  logins: string;

  @Column()
  email_address: string;

  @OneToMany( () => EstimationEntity , estimation => estimation.users)
  estimations: EstimationEntity[];

  @OneToMany( () => RechercheEntity , recherche => recherche.users)
  recherche: RechercheEntity[];
}

@Entity({ name: 'estimation' })
export class EstimationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  surface: number;

  @Column()
  pieces: number;

  @Column()
  ville: string;

  @Column()
  types: string;

  @Column()
  resultat: number;

  @Column()
  dates: string;

  @Column()
  code_postal: string;

  @ManyToOne(() => UserEntity, user => user.estimations)
  @JoinColumn({name: 'id'})
  users: UserEntity;
}

@Entity({ name: 'recherche' })
export class RechercheEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  surface: number;

  @Column()
  pieces: number;

  @Column()
  ville: string;

  @Column()
  types: string;

  @Column()
  budget: number;

  @Column()
  dates: string;

  @Column()
  code_postal: string;

  @ManyToOne(() => UserEntity, user => user.recherche)
  @JoinColumn({name: 'id'})
  users: UserEntity;
}
