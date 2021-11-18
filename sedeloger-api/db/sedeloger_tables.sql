CREATE TABLE IF NOT EXISTS immobilier 
(id_mutation varchar, 
date_mutation date,
valeur_fonciere numeric,
adresse_numero numeric,
adresse_nom_voie varchar,
code_postal numeric,
nom_commune varchar,
type_local varchar,
surface_reelle_bati numeric,
nombre_pieces_principales numeric,
longitude numeric,
latitude numeric);

CREATE TABLE IF NOT EXISTS users
(id SERIAL PRIMARY KEY NOT NULL,
logins varchar,
email_address varchar);
surface numeric,
pieces numeric,
ville varchar,
types varchar,
budget numeric,
dates varchar,
code_postal varchar,
resultat numeric,
type_research varchar);