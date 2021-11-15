export interface Estimation {
  login?: string;
  email_address?: string;
  city?: string;
  type?: string;
  rooms?: number;
  surface?: number;
  code_postal?: string;
  resultat?: number;
}

export interface Recherche {
  login?: string;
  email_address?: string;
  city?: string;
  type?: string;
  rooms?: number;
  surface?: number;
  code_postal?: string;
  budget?: number;
}
