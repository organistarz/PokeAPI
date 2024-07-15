#!/bin/bash -x

# [systemctl]
sudo systemctl stop PokeAPI && sudo systemctl disable PokeAPI
#
sudo rm -frv /var/www/PokeAPI
sudo rm -frv /etc/systemd/system/PokeAPI.service