#!/bin/bash

# build server
if [ $# -eq 0 ] || [ $* = "server" ]; then
  docker build -t htl-anichstrasse/sokka:v1 server
fi

# build acp
if [ $# -eq 0 ] || [ $* = "acp" ]; then
  sed -i "s/const[[:space:]]debug[[:space:]]=[[:space:]]true;/const debug = false;/g" ./acp/src/Util.ts # disable debug
  cd acp && sudo npm install && sudo npm run build
  cd ..
  sed -i "s/const[[:space:]]debug[[:space:]]=[[:space:]]false;/const debug = true;/g" ./acp/src/Util.ts # enable debug
fi

