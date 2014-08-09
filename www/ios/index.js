function disallowOverscroll(){
  $(document).on('touchmove',function(e){
    e.preventDefault();
  });
}
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, true);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        disallowOverscroll();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
      _this = this;

      setTimeout(function () {
        navigator.splashscreen.hide();
      }, 50);

      StatusBar.overlaysWebView(true);
      StatusBar.styleLightContent();
      StatusBar.show();

      /*
        Check Connection
      */  
      var checkConnection = function() {
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN] = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI] = 'WiFi connection';
        states[Connection.CELL_2G] = 'Cell 2G connection';
        states[Connection.CELL_3G] = 'Cell 3G connection';
        states[Connection.CELL_4G] = 'Cell 4G connection';
        states[Connection.NONE] = 'No network connection';

        if(networkState==Connection.NONE)
          return false;
        else
         return true; 
      }

      var testTwo = function() {
        var pingLoop = function(){
         _this.ping("YOUR_URL_HERE/assets/images/favicon.png", function(res) {
            if (res != "timeout" || res != "error") {
              //clearInterval(pingInterval);
              // alert('test 2');
              window.location = "http://YOUR_URL_HERE";
            }
         });
        }
        pingLoop();
      }

      var test = function() {
        if (checkConnection()) {
          // alert('connect up');
          clearInterval(connectionInterval);
          testTwo();
        }
      }

      var connectionInterval = setInterval(function() {
        test();
      }, 1000);
      test();
    },
    ping: function(ip, callback) {
      img = new Image();
      img.src = "http://" + ip;
      timer = setTimeout(function () {
        callback('timeout');
      }, 1500);
      img.onload = function () {
        clearTimeout(timer);
        callback('success');
      };
      img.onerror = function () {
        clearTimeout(timer);
        callback('error');
      };
    }
};
