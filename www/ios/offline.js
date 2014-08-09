var argscheck = require('cordova/argscheck'),
      utils = require('cordova/utils'),
      exec = require('cordova/exec');
   
var Offline = function() {
};

Offline.hide = function() {
    exec(null, null, "Offline", "hide", [hide]);
};

Offline.show = function() {
    exec(null, null, "Offline", "show", [show]);
};

module.exports = Offline;