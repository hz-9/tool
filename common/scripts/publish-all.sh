#!/bin/bash

echo "Pre Start"

rush pre-start

echo "Buildings"

rush build

echo "Publish"

rush publish -a -p --target-branch master --add-commit-details --ignore-git-hooks
