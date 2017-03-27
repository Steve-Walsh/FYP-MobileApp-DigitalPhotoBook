cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-camera.Camera",
        "file": "plugins/cordova-plugin-camera/www/CameraConstants.js",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "Camera"
        ]
    },
    {
        "id": "cordova-plugin-camera.CameraPopoverOptions",
        "file": "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "CameraPopoverOptions"
        ]
    },
    {
        "id": "cordova-plugin-camera.camera",
        "file": "plugins/cordova-plugin-camera/www/Camera.js",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "navigator.camera"
        ]
    },
    {
        "id": "cordova-plugin-camera.CameraPopoverHandle",
        "file": "plugins/cordova-plugin-camera/www/CameraPopoverHandle.js",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "CameraPopoverHandle"
        ]
    },
    {
        "id": "cordova-plugin-device.device",
        "file": "plugins/cordova-plugin-device/www/device.js",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "id": "cordova-plugin-dialogs.notification",
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "id": "cordova-plugin-dialogs.notification_android",
        "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "id": "cordova-plugin-ms-adal.utility",
        "file": "plugins/cordova-plugin-ms-adal/www/utility.js",
        "pluginId": "cordova-plugin-ms-adal",
        "runs": true
    },
    {
        "id": "cordova-plugin-ms-adal.AuthenticationContext",
        "file": "plugins/cordova-plugin-ms-adal/www/AuthenticationContext.js",
        "pluginId": "cordova-plugin-ms-adal",
        "clobbers": [
            "Microsoft.ADAL.AuthenticationContext"
        ]
    },
    {
        "id": "cordova-plugin-ms-adal.CordovaBridge",
        "file": "plugins/cordova-plugin-ms-adal/www/CordovaBridge.js",
        "pluginId": "cordova-plugin-ms-adal"
    },
    {
        "id": "cordova-plugin-ms-adal.AuthenticationResult",
        "file": "plugins/cordova-plugin-ms-adal/www/AuthenticationResult.js",
        "pluginId": "cordova-plugin-ms-adal"
    },
    {
        "id": "cordova-plugin-ms-adal.TokenCache",
        "file": "plugins/cordova-plugin-ms-adal/www/TokenCache.js",
        "pluginId": "cordova-plugin-ms-adal"
    },
    {
        "id": "cordova-plugin-ms-adal.TokenCacheItem",
        "file": "plugins/cordova-plugin-ms-adal/www/TokenCacheItem.js",
        "pluginId": "cordova-plugin-ms-adal"
    },
    {
        "id": "cordova-plugin-ms-adal.UserInfo",
        "file": "plugins/cordova-plugin-ms-adal/www/UserInfo.js",
        "pluginId": "cordova-plugin-ms-adal"
    },
    {
        "id": "cordova-plugin-ms-adal.AuthenticationSettings",
        "file": "plugins/cordova-plugin-ms-adal/www/AuthenticationSettings.js",
        "pluginId": "cordova-plugin-ms-adal",
        "clobbers": [
            "Microsoft.ADAL.AuthenticationSettings"
        ]
    },
    {
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "id": "cordova-plugin-statusbar.statusbar",
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "id": "ionic-plugin-keyboard.keyboard",
        "file": "plugins/ionic-plugin-keyboard/www/android/keyboard.js",
        "pluginId": "ionic-plugin-keyboard",
        "clobbers": [
            "cordova.plugins.Keyboard"
        ],
        "runs": true
    },
    {
        "id": "phonegap-plugin-push.PushNotification",
        "file": "plugins/phonegap-plugin-push/www/push.js",
        "pluginId": "phonegap-plugin-push",
        "clobbers": [
            "PushNotification"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-compat": "1.1.0",
    "cordova-plugin-camera": "2.3.1",
    "cordova-plugin-console": "1.0.5",
    "cordova-plugin-device": "1.1.4",
    "cordova-plugin-dialogs": "1.3.1",
    "cordova-plugin-ms-adal": "0.9.0",
    "cordova-plugin-splashscreen": "3.2.2",
    "cordova-plugin-statusbar": "2.1.3",
    "cordova-plugin-whitelist": "1.2.2",
    "ionic-plugin-keyboard": "2.2.1",
    "phonegap-plugin-push": "1.10.0"
};
// BOTTOM OF METADATA
});