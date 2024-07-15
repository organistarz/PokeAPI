#!/usr/bin/env bash

cd /var/www/PokeAPI && sudo npm install --omit=dev --install-links=false

sudo chown -R root:www-data /var/www/PokeAPI
sudo chmod -R 755 /var/www

