global.document = require('jsdom').jsdom('<body><div id="app" /></body>');
global.window = document.defaultView;
global.navigator = window.navigator;
