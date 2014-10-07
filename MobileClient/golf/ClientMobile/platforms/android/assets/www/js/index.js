
//Display an alert with some information
function helper(){
    alert('Device Name: '     + device.name     + '\n' +
          'Device Cordova: '  + device.cordova  + '\n' +
          'Device Platform: ' + device.platform + '\n' +
          'Device UUID: '     + device.uuid     + '\n' +
          'Device Version: '  + device.version  + '\n' +
          'Application version: 0.1'            + '\n\n' +
          'In order to start the application all information of the page must be green' + '\n\n' +
          'GolfChallenge require an internet and GPS connection' + '\n');
}