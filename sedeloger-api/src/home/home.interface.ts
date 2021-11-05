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

enum LocalType {
    HOUSE,
    APARTMENT
}

export interface AveragePrice {
    localType: LocalType;
    averagePrice: number;
    trustIndex: number;
}