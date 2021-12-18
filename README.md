# rest2onvif
Simple NodeJS Rest to Onvif proxy, based on node-onvif (https://github.com/agsh/onvif)

Not in any way complete, but it's here..

Implemented functions:

* /api/gotopreset
* /api/ptzmove
* /api/setpreset
* /api/ptzstop

# Install
```
git clone https://github.com/MrMEEE/rest2onvif.git
cd rest2onvif
npm install
cp config.js.example config.js
```
*Edit config.js*
```
node app.js
```
