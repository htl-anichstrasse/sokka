#!/bin/bash
# build server
docker build -t htl-anichstrasse/sokka:v1 server
# build acp
cd acp && npm install && npm run build
