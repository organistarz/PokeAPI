#!/usr/bin/env bash

sudo systemctl status PokeAPI
sudo rm -frv /var/www/PokeAPI/scripts /var/www/PokeAPI/configuration /var/www/PokeAPI/appspec.yml

sleep 30

if (sudo systemctl is-active --quiet PokeAPI); then
  echo "PokeAPI is running"
else
  echo "PokeAPI is not running"
  exit 1;
fi