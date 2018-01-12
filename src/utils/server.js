#!/usr/bin/env node
'use strict';

const express = require('express');
const fs = require('fs');

const app = express();
const workingDirectory = process.cwd();
const serverDirectory = __dirname;

app.use(express.static(`${workingDirectory}/src`));

const toObjectString = (o, n=0) => {
  if (n > 3) return '\n';
  let res = [];
  for (var key in o) {
    if (!key.match(/^\_/)) {
      let value = o[key];
      switch (typeof value) {
        case 'function':
          res.push(`${key}: function,`);
          break;

        case 'object':
          if (value) {
            res.push(`${key}:\n${toObjectString(value, n+1)}`);
            break;
          } // else fallthrough for null

        default: res.push(`${'\t'.repeat(n)}${key}: ${'' + value}`);
      }
    }
  }

  return res.join('\n');
};

app.post('/data/login', function(request, response) {
  response.end(JSON.stringify(true));
});

app.get('*', function(request, response, next) {
  console.log(`URL: ${request.url}`);
  if (request.url.match(/\.[0-9a-zA-Z]*$/)) {
    console.log(`File ${request.url} requested, serving...`);
    response.sendFile(`${workingDirectory}/${request.url}`);
    console.log('done.');
    return;
  } else {
    next();
  }
}, function (request, response, next) {
  let index = request.url.match(/\/$/) ? request.url : `${request.url}/`;
  let pathPieces = request.url.split('/').filter(x => x);
  try {
    console.log('Checking directory for index.html...');
    const index = request.url.match(/\/$/) ? request.url : `${request.url}/`;
    response.sendFile(`${workingDirectory}/${index}index.html`);
    console.log('done.');
    return;
  } catch (e) {
    console.log('not found.');
    next();
  }
}, function(request, response) {
  console.log('Serving local index.html...');
  response.sendFile(`${workingDirectory}/index.html`);
  console.log('done.');
  return;
});

app.listen(8080, _ => console.log(`ui-components dev server listening at localhost:8080.`));
