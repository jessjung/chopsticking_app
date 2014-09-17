
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var view;
var cssDebug = false;
var deviceID = "F3B4F467-18F6-6838-3031-5E8A9FAFC7D7";

var counter=0;


var app = {
    // Application Constructor
    initialize: function() {
        if(cssDebug){
          view = new ViewController(app);
          view.init();
        }else{
          this.bindEvents();
        }
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
      console.log("chopsticking::onDeviceReady");
      view = new ViewController(app);
      app.scan();
      bluetoothSerial.subscribe("\n", app.onmessage, app.generateFailureFunction("Subscribe Failed"));

    },
    scan: function(){
      app.listup();
      view.scan();
    },

    listup: function(){
      console.log('chopsticking::listup');
      bluetoothSerial.list(app.ondevicelist, app.generateFailureFunction("List Failed"));
    },

    ondevicelist: function(devices) {
      console.log("chopsticking::ondevicelist");
      console.log(devices);
      if (devices.length === 0) {
        view.scanFailed();
        setTimeout(app.scan, 2000);
      }else{
        console.log("Found " + devices.length + " device" + (devices.length === 1 ? "." : "s."));
        app.connect();
      }

    },

    connect: function() {
      console.log("chopsticking::connect");
      var device = deviceID;


      // devices.forEach(function(device) {
      //   if (device.hasOwnProperty("uuid")) {
      //     if(device.uuid == deviceID) {
      //       console.log("Requesting connection to " + deviceID);
      //       bluetoothSerial.connect(device, app.onconnect, app.ondisconnect);
      //     } else {
      //       app.generateFailureFunction("connection Failed");
      //     }
      //   }
      // });
      //console.log(deviceList[0].value);
      // var device = deviceList[0].value;
      // //app.disable(connectButton);
      // app.setStatus("Connecting...");

      console.log("Requesting connection to " + device);
      bluetoothSerial.connect(device, app.onconnect, app.ondisconnect);
    },

    onconnect: function() {
      console.log("chopsticking::onconnect");
      view.init();
    },

    ondisconnect: function(reason) {
      console.log("chopsticking::ondisconnect");

      var details = "";
      if (reason) {
          details += ": " + JSON.stringify(reason);
      }
    },
    onplay: function(){
      console.log("chopsticking::onplay");
      view.countdown();

    },
    onscore: function(message){
      console.log("chopsticking::onscore");

      var sl = message.split('/');
      view.displayScore(sl[0],sl[1],sl[2],sl[3]);
    },
    onwrite: function(t){
      console.log("chopsticking::onwrite");

      var text = t + "\n";
      var success = function(){
        console.log("written value : " + t);
      }
      bluetoothSerial.write(text,success);
    },
    onmessage: function(message) {
      console.log("chopsticking::onmessage");
      app.onscore(message);
      // console.log("from serial: "+message);

    },
    generateFailureFunction: function(message) {
      var func = function(reason) { // some failure callbacks pass a reason
        var details = "";
        if (reason) {
          details += ": " + JSON.stringify(reason);
        }
        app.setStatus(message + details);
      };
      return func;
    },

    setStatus: function(message) {
        console.log(message);
    }

};
