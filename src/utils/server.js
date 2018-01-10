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

// const Hapi = require('hapi');
// const inert = require('inert');
// const fs = require('fs');
//
// const server = new Hapi.Server();
// server.connection({ port: 8080, host: 'localhost' });
//
// server.route({
//   method: '*',
//   path: '/data/{dataURL}',
//   handler: function(request, reply) {
//     console.log(request.url);
//     reply('{}');
//   }
// });
//
// server.register(inert, err => {
//   if (err) throw err;
//
//   server.route({
//     method: 'GET',
//     path: '/',
//     handler: function(request, reply) {
//       if (!request.params.fileName) {
//         console.log('Replying with index.html.');
//         reply.file('./index.html');
//       } else {
//         console.log(`File: ${request.params.filename}`);
//         console.log(`URL: ${request.url}`);
//         reply('hello there');
//       }
//     }
//   });
// });
//
// server.start(err => {
//   if (err) throw err;
//   console.log(`ui-components dev server running at ${server.info.uri}.`);
// });

// const http = require('http');
// const fs = require('fs');
// const url = require('url');
//
// const INDEX_NOT_FOUND = `Could not load index page.
// Make sure 'index.html' exists in the current directory.
// Check terminal output for details.`
//
// const server = http.createServer(function(request, response) {
//   let path;
//   try {
//     console.log(`Request for URL ${request.url},`);
//     let parsed = url.parse(request.url);
//     console.log('Parsed to: ');
//     console.log(parsed);
//     path = '.' + parsed.pathname;
//   } catch (e) {
//     console.error(e);
//     response.statusCode = 400;
//     response.end('Bad request.');
//     return;
//   }
//
//   console.log(`Serving request for ${path}...`);
//   switch (path) {
//     case '.':
//     case './':
//     case './index':
//     case './index.html':
//     case '.?':
//     case './?':
//     case './index?':
//     case './index.html?':
//       console.log('Request for local index, serving...');
//       fs.readFile('./index.html', 'utf-8', (err, f) => {
//         if (err) {
//           console.error(err);
//           response.statusCode = 500;
//           response.end(INDEX_NOT_FOUND);
//         } else {
//           response.end(f);
//         }
//       });
//       break;
//
//     default:
//       // Check if it's a file request and try to serve
//       const fileExt = path.match(/\.([0-9a-zA-Z]+)$/);
//       if (fileExt) {
//         const mime = (ext => {
//           console.log(`Request for a ${ext} file:`);
//           switch (ext) {
//             case 'js':
//             case 'mjs':
//               return 'text/javascript';
//
//             case 'css':
//               return 'text/css';
//
//             case 'jpeg':
//             case 'jpg':
//               return 'image/jpeg';
//
//             case 'html':
//             case 'htm':
//               return 'text/html';
//
//             case 'png':
//               return 'image/png';
//
//             case 'gif':
//               return 'image/gif';
//
//             case 'svg':
//               return 'image/svg+xml'
//
//             case 'ico':
//               return 'image/x-icon';
//
//             case 'mpeg':
//             case 'mp3':
//               return 'audio/mpeg';
//
//             case 'ogg':
//               return 'application/ogg';
//
//             case 'wav':
//             case 'webm':
//             case 'midi':
//               return 'audio/*';
//
//             case 'mp4':
//             case 'h264':
//               return 'video/mp4';
//
//             case 'ogv':
//               return 'video/ogg';
//
//             case 'pdf':
//             case 'xml':
//             case 'ppt':
//             case 'ttf':
//             case 'otf':
//             case 'eot':
//             case 'woff':
//               return 'application/octet-stream';
//
//             default:
//               return 'text/plain';
//           }
//         })(fileExt[1]);
//         console.log(`setting MIME type to '${mime}'. Reading file...`);
//
//         fs.readFile(path, 'utf-8', (err, f) => {
//           if (err) {
//             console.error(err);
//             response.statusCode = 404;
//             response.end(`Error 404: file ${path} not found.`);
//           } else {
//             response.writeHead(200, {
//               'Content-Type': mime
//             });
//
//             response.write(f);
//             response.end();
//           }
//         });
//       } else {
//         // Since it's not a file, add directory slash if not present:
//         if (!path.match(/\/$/)) path = path + '/';
//
//         console.log(`Searching for ${path + 'index.html'}...`);
//         fs.readFile(`${path}index.html`, 'utf-8', (err, f) => {
//           if (err) {
//             console.log('Not found. Assuming client-side route, returning index.html.');
//             fs.readFile('./index.html', 'utf-8', (err, f) => {
//               if (err) {
//                 console.error(err);
//                 response.statusCode = 500;
//                 response.end(INDEX_NOT_FOUND);
//               } else {
//                 response.end(f);
//               }
//             });
//           } else {
//             console.log('found. Serving.');
//             response.end(f);
//           }
//         });
//       }
//   }
// });
//
// server.listen(8080, _ => {
//   console.log('ui-components dev server listening on localhost 8080.');
// });
