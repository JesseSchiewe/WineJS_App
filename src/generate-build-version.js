/* eslint-disable */
import { writeFile } from 'fs';
import { version as _version } from './package.json';

const appVersion = _version;

const jsonData = {
  version: appVersion
};

var jsonContent = JSON.stringify(jsonData);

writeFile('./public/meta.json', jsonContent, 'utf8', function(err) {
  if (err) {
    console.log('An error occured while writing JSON Object to meta.json');
    return console.log(err);
  }

  console.log('meta.json file has been saved with latest version number');
});

/* eslint-enable */