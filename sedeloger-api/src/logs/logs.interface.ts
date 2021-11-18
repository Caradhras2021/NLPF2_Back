export interface Logs {
  login?: string;
  email_address?: string;
  typeResearch: string;
  city?: string;
  type?: string;
  rooms?: number;
  surface?: number;
  code_postal?: string;
  resultat?: number;
  budget?: number;
}

export interface SignIn {
  login: string;
  email_address: string;
}
