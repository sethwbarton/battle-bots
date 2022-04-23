#!/usr/bin/env bash
shopt -s globstar
for file in __test__/**/*.test.ts ;
do
  ts-node  "$file" --project tsconfig.json;
done