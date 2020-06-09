#!/bin/bash
docker kill $(docker ps -aqf "name=sokka")
