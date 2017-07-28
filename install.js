'use strict';

var Download = require('download'),
    downloadStatus = require('download-status'),
    os = require('os');

function getChromedriverUrl() {
  var urlBase = 'http://chromedriver.storage.googleapis.com/2.22/';

  switch (os.platform()) {
    case 'darwin':
      return urlBase + 'chromedriver_mac32.zip';
    case 'linux':
      return urlBase + ((os.arch() === 'x64') ? 'chromedriver_linux64.zip' : 'chromedriver_linux32.zip');
    case 'win32':
      return urlBase + 'chromedriver_win32.zip';
    default:
      throw new Error('Unsupported platform: ' + os.platform());
  }
}

var url = getChromedriverUrl();

console.log('Will download ' + url);

new Download({mode: '755', extract: true})
    .get(url)
    .dest('vendor')
    .use(downloadStatus())
    .run(function(err) {
      if (err) {
        throw err;
      }
    });
