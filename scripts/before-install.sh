#!/bin/bash -x

sudo apt update
sudo apt upgrade -y
#
sudo apt install nodejs
#
#
sudo addgroup www-data
sudo usermod -a -G www-data ubuntu && sudo usermod -a -G www-data root
