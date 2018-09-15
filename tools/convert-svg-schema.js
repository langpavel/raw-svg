#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const http = require('http');
const xmljs = require('xml-js');
const prettier = require('prettier');

const XSD_FILE = path.resolve(__dirname, '../tools/SVG.xsd');
const JSON_FILE = path.resolve(__dirname, '../src/svg-schema.json');

console.log(`Reading definition from ${XSD_FILE}`);
const xsd = fs.readFileSync(XSD_FILE, 'utf-8');

console.log(`Parsing…`);
const js = xmljs.xml2js(xsd, {
  compact: false,
  trim: true,
  alwaysArray: true,
  nativeType: true,
  nativeTypeAttributes: true,
  ignoreDeclaration: true,
  ignoreDoctype: true,
  ignoreComment: true,
});

console.log(`Formatting…`);
const json = JSON.stringify(js, null, 2);
const pretty = prettier.format(json, {
  parser: 'json',
});

console.log(`Writing JSON to ${JSON_FILE}`);
fs.writeFileSync(JSON_FILE, pretty);

console.log('Done !');
