import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'immobilier' })
export class HomeEntity {
  @PrimaryGeneratedColumn()
  id_mutation: string;

  @Column({
    nullable: true,
  })
  date_mutation: Date;

  @Column({
    nullable: true,
  })
  valeur_fonciere: number;

  @Column({
    nullable: true,
  })
  adresse_numero: number;

  @Column({
    nullable: true,
  })
  adresse_nom_voie: string;

  @Column({
    nullable: true,
  })
  code_postal: number;

  @Column({
    nullable: true,
  })
  nom_commune: string;

  @Column({
    nullable: true,
  })
  surface_reelle_bati: number;

  @Column({
    nullable: true,
  })
  type_local: string;

  @Column({
    nullable: true,
  })
  nombre_pieces_principales: number;

  @Column({
    nullable: true,
  })
  longitude: number;

  @Column({
    nullable: true,
  })
  latitude: number;
}
