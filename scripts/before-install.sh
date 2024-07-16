#!/bin/bash -x

if [[ $OSTYPE == 'linux-gnu' ]]; then
	sudo apt update
	sudo apt upgrade -y
	#
#	NVM_DIR=/usr/local/nvm
#	NODE_VERSION=20.13.1
	#
#	sudo mkdir -p $NVM_DIR && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
#	bash -c ". $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm use $NODE_VERSION"
	#
#	ln -s $NVM_DIR/versions/node/v$NODE_VERSION/bin/node /usr/bin/node
#	ln -s $NVM_DIR/versions/node/v$NODE_VERSION/bin/npm /usr/bin/npm
	#
	sudo apt install nodejs
	#
#	sudo apt install -y python3 python3-pip
#	sudo pip3 install awscli
	#
	sudo addgroup www-data
	sudo usermod -a -G www-data ubuntu && sudo usermod -a -G www-data root
fi