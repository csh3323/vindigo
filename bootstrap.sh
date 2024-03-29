#!/bin/sh

CONFIG_FILE=/vindigo/data/config.toml

if [ ! -f "$CONFIG_FILE" ]; then
    echo "Missing config file at path $SERVICE_FILE" 
    node vindigo init --defaults
    echo "Config file generated, container will be exiting"
    exit 0
fi

echo "Waiting for database to start"
wait-on tcp:database:3306

echo "Applying oustanding migrations"
node vindigo migrate:apply --all

exec "$@"