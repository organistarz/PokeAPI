#!/bin/bash -x

if [[ $OSTYPE == 'linux-gnu' ]]; then
	sudo apt update
	sudo apt upgrade -y
	#
	ENV NVM_DIR /usr/local/nvm
	ENV NODE_VERSION 20.13.1
	#
	RUN mkdir -p $NVM_DIR && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
	RUN bash -c ". $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm use $NODE_VERSION"
	#
	RUN ln -s $NVM_DIR/versions/node/v$NODE_VERSION/bin/node /usr/bin/node
	RUN ln -s $NVM_DIR/versions/node/v$NODE_VERSION/bin/npm /usr/bin/npm
	#
	sudo apt install -y python3 python3-pip
	sudo pip3 install awscli
	#
	sudo addgroup www-data
	sudo usermod -a -G www-data ubuntu && sudo usermod -a -G www-data root
fi