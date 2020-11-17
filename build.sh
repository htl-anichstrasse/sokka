#!/bin/bash

# build server
docker build -t htl-anichstrasse/sokka:v1 server

# build acp
sed -i "s/const[[:space:]]debug[[:space:]]=[[:space:]]true;/const[[:space:]]debug[[:space:]]=[[:space:]]false;" ./acp/src/Util.ts # disable debug
cd acp && npm install && npm run build
sed -i "s/const[[:space:]]debug[[:space:]]=[[:space:]]false;/const[[:space:]]debug[[:space:]]=[[:space:]]true;" ./acp/src/Util.ts # enable debug
