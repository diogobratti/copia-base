#!/bin/sh
npx sequelize db:drop 
npx sequelize db:create 
npx sequelize db:migrate