
# Introduction

Main Application

## Requirements

- Nodejs 6.0 and above
- MongoDB
- Redis
- Nodemon: `npm install -g nodemon`

## Install

```bash

npm install

cp development.conf.js development.sample.js  ##if you want to override local

```
- Import/Export MongoDB Database

```bash
cd web          			# Change directory to web 
babel-node commander init	# init data

```

OR

```bash
cd misc/seeds  # Change directory to misc/seeds
node import    # Run this command to import default cms data
node export    # Run this command to export your cms data and share to team members

```

## How to run:

```bash
yarn start
```
Website: `http://localhost:9006/`
API: `http://localhost:9001/`
CMS: `http://localhost:9000/`


## Notes
- Using ES6 feature, for example: 
+ Arrow function
+ let and const
+ import and export
+ promise
+ shortant property
+ array/object destructuring
+ Checkout more: http://es6-features.org/
