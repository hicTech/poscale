cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-device.device",
      "file": "plugins/cordova-plugin-device/www/device.js",
      "pluginId": "cordova-plugin-device",
      "clobbers": [
        "device"
      ]
    },
    {
      "id": "cordova-plugin-device-motion.Acceleration",
      "file": "plugins/cordova-plugin-device-motion/www/Acceleration.js",
      "pluginId": "cordova-plugin-device-motion",
      "clobbers": [
        "Acceleration"
      ]
    },
    {
      "id": "cordova-plugin-device-motion.accelerometer",
      "file": "plugins/cordova-plugin-device-motion/www/accelerometer.js",
      "pluginId": "cordova-plugin-device-motion",
      "clobbers": [
        "navigator.accelerometer"
      ]
    },
    {
      "id": "cordova-plugin-fastclick.FastClick",
      "file": "plugins/cordova-plugin-fastclick/www/fastclick.js",
      "pluginId": "cordova-plugin-fastclick",
      "clobbers": [
        "FastClick"
      ]
    },
    {
      "id": "cordova-plugin-fastclick.FastClickBootstrap",
      "file": "plugins/cordova-plugin-fastclick/www/bootstrap.js",
      "pluginId": "cordova-plugin-fastclick",
      "runs": true
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-device": "2.0.3",
    "cordova-plugin-device-motion": "2.0.1",
    "cordova-plugin-fastclick": "1.0.0"
  };
});