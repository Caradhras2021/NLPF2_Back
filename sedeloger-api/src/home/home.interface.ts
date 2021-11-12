import { HomeEntity } from './home.entity';

export interface SelogerFilters {
  date_mutation?: Date;
  valeur_fonciere?: number;
  adresse_numero?: number;
  adresse_nom_voie?: string;
  code_postal?: number;
  nom_commune?: string;
  surface_reelle_bati?: number;
  type_local?: string;
  nombre_pieces_principales?: number;
  longitude?: number;
  latitude?: number;
}

export interface CreditResults {
  creditInfos: CreditCompute;
  homeEntities: HomeEntity[];
}

export interface CreditInfos {
  apport: number;
  salaire: number;
}

export interface CreditCompute {
  priceMax: number;
  mensualiteMax: number;
  dureeMin: number;
  montantCreditMax: number;
  dureeMinYear?: number;
}

export interface DeltaPrice {
  min: number;
  max: number;
}

export enum LocalType {
  Maison,
  Appartement,
}

export interface AveragePrice {
  localType: string;
  averagePrice: number;
  trustIndex: number;
  nbResult: number;
  deltaMinMax: DeltaPrice;
}

export interface InflationRate {
  averagePrice2019: number;
  averagePrice2020: number;
  inflationPrice: number;
  inflationRate: number;
}
