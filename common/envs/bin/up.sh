#!/bin/bash

root=$(cd `dirname $0`; dirname `pwd`)

docker-compose -p monorepos -f ${root}/compose/docker-compose.yml up -d
