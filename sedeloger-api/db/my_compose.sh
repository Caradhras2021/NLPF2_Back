#!/bin/bash


sudo docker build -t julientrs/nlpf_docker_postgres:2 .

sudo docker run --name mydb -v $PWD/pgdata:/var/lib/postgresql/data -e POSTGRES_PASSWORD=caradhras -e POSTGRES_DB=sedeloger_database -p 6666:5432 julientrs/nlpf_docker_postgres:2

# --- Once the container is running ---
# sudo mv new_full.csv db/pgdata


# --- To enter in the container ---
# sudo docker exec -it mydb psql -U postgres -d sedeloger_database

# --- Once in the container to import the csv --- 
# \copy immobilier FROM '/var/lib/postgresql/data/new_full.csv' DELIMITER ',' CSV HEADER;