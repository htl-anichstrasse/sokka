#!/bin/bash

# kill all running sokka containers
./stop.sh

# trigger build
if [ "$*" = "build" ]; then
	./build.sh
fi

# compose
if [ "$*" = "debug" ]; then
	docker-compose up
else
	docker-compose up -d
fi
