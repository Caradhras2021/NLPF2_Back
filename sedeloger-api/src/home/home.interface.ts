export interface SelogerFilters {
  date_mutation?: Date;
  valeur_fonciere?: number;
  adresse_numero?: number;
  adresse_nom_voie?: string;
  code_postal?: number;
  nom_commune?: string;
  lot1_surface_carrez?: number;
  type_local?: string;
  nombre_pieces_principales?: number;
  longitude?: number;
  latitude?: number;
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
