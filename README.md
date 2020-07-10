# Meter Made

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)


## Description

## Local setup

### Install node.js and mongodb

On OS X, if you have brew installed:

    brew install node
    brew install mongodb

### Install dependencies

    yarn

### Create a .env file

Create a file in the project root called `.env.local`. Setup values for `MONGODB_URI`, `ADMIN_USERNAME`, and `ADMIN_PASSWORD`.

    MONGODB_URI=mongodb://127.0.0.1:27017/yoursurveydatabase
    ADMIN_USERNAME=username
    ADMIN_PASSWORD=securepassword
    NEXT_PUBLIC_SAVE_RESPONSES=true

The `ADMIN_USERNAME` and `ADMIN_PASSWORD` are used for bulk .csv export of survey responses.

### Start mongodb

    mongod

### In a new tab, run the app

    yarn dev

### Open your browser and visit:

    http://localhost:3000

## Exporting responses

While running the app, visit:

    http://localhost:3000/responses.csv

The username and password are defined in the `.env.local` file.


## License
This project is licensed under GNU General Public License v3.0.
