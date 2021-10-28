FROM postgres:alpine
COPY *.sql /docker-entrypoint-initdb.d/
ADD sedeloger_tables.sql /docker-entrypoint-initdb.d
RUN chmod a+r /docker-entrypoint-initdb.d/*
EXPOSE 6666