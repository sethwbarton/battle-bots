#!/usr/bin/env bash
shopt -s globstar
for file in test/**/*.test.ts ;
do
  ts-node  "$file" --project tsconfig.json;
done