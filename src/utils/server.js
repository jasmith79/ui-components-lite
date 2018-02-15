#!/usr/bin/env node
/*
 * server.js
 * @author jasmith79
 * @copyright Jared Smith
 * @license MIT
 * You should have received a copy of the license with this work but it may also be found at
 * https://opensource.org/licenses/MIT
 *
 * development server for ui-components-lite. Python's simpleHTTPServer/http.server chokes when
 * Chrome tries to load a bunch of `imports` all at once, so I wrote a quicky express server to
 * handle it.
 */

'use strict';

const express = require('express');
const fs = require('fs');
const upload = require('multer')();

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

app.post('/data/formtest', upload.array(), function(request, response) {
  if (Object.entries(request.body).toString() === Object.entries({foo:3}).toString()) {
    response.end('foo');
  } else {
    response.end('bar');
  }
});

app.post('/data/formtest2', upload.array(), function(request, response) {
  if (Object.entries(request.body).toString() === Object.entries({foo:3}).toString()) {
    response.end('extra');
  } else {
    response.end('sauce');
  }
});

app.get('*', function(request, response, next) {
  console.log(`URL: ${request.url}`);
  if (request.path.match(/\.[0-9a-zA-Z]*$/)) {
    console.log(`File ${request.path} requested, serving...`);
    let npmDep = ['mixwith', 'jsstring', 'extracttype'].find(x => request.url.match(x));
    let path = npmDep ?
      `${workingDirectory}/node_modules/${request.path}` :
      `${workingDirectory}/${request.path}`;

    response.sendFile(path);
    console.log('done.');
    return;
  } else {
    next();
  }
}, function (request, response, next) {
  console.log(`path is ${request.path}`);
  let index = request.path.match(/\/$/) ? request.url : `${request.url}/`;
  let pathPieces = request.path.split('/').filter(x => x);
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
