#!/bin/bash
set -e

SERVER="sedeloger_database_server";
PW="caradhras";
DB="sedeloger_database";

docker kill $SERVER || : && \
  (docker rm $SERVER || :)