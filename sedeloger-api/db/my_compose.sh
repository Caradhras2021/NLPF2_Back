#!/bin/bash


sudo docker build -t julientrs/nlpf_docker_postgres:2 .

sudo docker run --rm --name mydb -v $PWD/pgdata:/var/lib/postgresql/data -e POSTGRES_PASSWORD=caradhras -e POSTGRES_DB=sedeloger_database -p 6666:5432 julientrs/nlpf_docker_postgres:2

sudo docker exec -it mydb psql -U postgres -d sedeloger_database

# \copy * FROM '/var/lib/postgresql/data/new_full.csv' DELIMITER ',' CSV HEADER;