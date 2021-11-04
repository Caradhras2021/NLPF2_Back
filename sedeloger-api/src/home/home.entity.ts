import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'immobilier' })
export class HomeEntity {
  @PrimaryGeneratedColumn()
  id_mutation: string;

  @Column()
  date_mutation: Date;

  @Column()
  valeur_fonciere: number;

  @Column()
  adresse_numero: number;

  @Column()
  adresse_nom_voie: string;

  @Column()
  code_postal: number;

  @Column()
  nom_commune: string;

  @Column()
  lot1_surface_carrez: number;

  @Column()
  type_local: string;

  @Column()
  nombre_pieces_principales: number;

  @Column()
  longitude: number;

  @Column()
  latitude: number;
}
