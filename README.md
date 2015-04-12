Cropper
=========

Cropper is a real-time collaborative social-network made for farmers who want to alert
to other farmers of dangeours events, like floods, storms, plagues, diseases...

Everyone can submit information of dangeours events associated with a place, and attach information specific to the type of event, like precipitation quantity, custom properties or a photo.

The most interesting feature is that farmers can subscribe to zones. They can define notified "zones"; in the case someone posts an event in that zone, an email will be send to the farmer, describing the disease.

Other interesant features are:
* real time synchronization of events between all clients.
* visual hightlights of changes produced by other users.
* real time advanced chat between clients of the application

Developed for Zaragoza Space App 2015 by Daniel Barea, Diego Ceresuela, Ismael Rodríguez, Sergio Soro and David Vergara.
## Creators

**Daniel Barea**

- <https://twitter.com/dbarelop>
- <https://github.com/dbarelop>

**Diego Ceresuela**

- <https://twitter.com/dicearr>
- <https://github.com/dicearr>

**Ismael Rodríguez**

- <https://twitter.com/ismaro9>
- <https://github.com/ismaro3>

**Sergio Soro**
- <https://twitter.com/teruyi>
- <https://github.com/teruyi>

**David Vergara**
- <https://github.com/davidvergara>


- ###Technologies

* [node.js]
* [Leaflet] + [Leaflet.draw]
* [AngularJS]
* [socket.io]
* [CouchDB]
* [Grunt]
* [Bower]




###Install dependencies (Ubuntu)

It is assumed that you have installed node.js (developed using 0.10.26)
```
sudo apt-get install couchdb
npm install -g grunt-cli
npm install -g bower
npm install -g forever

```


###Run for Development


```
npm install
bower install
grunt serve

```

###Run for Production


```
npm install
bower install
grunt build
NODE_ENV=production forever -o out.log -e err.log start dist/server.js

```

##### or with Docker and fig

It may be necessary to rename the folder `Ethermap` to `ethermap` (note the lower case e), as Docker cannot create things with uppercase names.

```
sudo fig up
```
Ethermap will be available from http://localhost:8080


###Testing

Tests are based on Karma + Jasmine

For single test runs:
```
grunt test
```
For continuous testing:
```
npm install -g karma-cli
karma start
```

###Create the JSDoc pages

```
grunt docs
```


###License

[Apache v2.0](license.md) - Dennis Wilhelm 2014



[node.js]:http://nodejs.org/
[CouchDB]:http://couchdb.apache.org/
[AngularJS]:https://angularjs.org/
[Grunt]:http://gruntjs.com/
[Bower]:http://bower.io/
[socket.io]:http://socket.io/
[Leaflet]:http://leafletjs.com/
[Leaflet.draw]:https://github.com/Leaflet/Leaflet.draw
