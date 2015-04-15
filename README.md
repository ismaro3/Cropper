Cropper
=========

Cropper is a near real-time crowd-sourced disaster prevention network made for growers to be notified in case of
dangerous events such as floods, storms, plagues or diseases, among others.

Anyone can submit information about events associated with a location and attach custom information specific to 
the type of event or a picture.

One of the key features of the application is the ability of growers to subscribe to areas. They can define 
notification areas so that in case someone posts an event in that zone an email will be sent to the grower 
describing the issue.

Other interesting features are:
* real time synchronization of events between all clients.
* visual hightlights of changes made by other users.
* real time advanced chat between users.

Developed for Zaragoza Space Apps 2015 "Crop alert - learning from the growers" Challenge by 
Daniel Barea, Diego Ceresuela, Ismael Rodríguez, Sergio Soro and David Vergara.
Based on the application [Ethermap](https://github.com/dwilhelm89/Ethermap) created by [Dennis Wilhelm](https://github.com/dwilhelm89).

## Creators

**Daniel Barea**

- <https://twitter.com/dbarelop>
- <https://github.com/dbarelop>

**Diego Ceresuela**

- <https://twitter.com/dicearr>
- <https://github.com/dicearr>

**Ismael Rodríguez**

- <https://twitter.com/ismaro39>
- <https://github.com/ismaro3>

**Sergio Soro**
- <https://twitter.com/teruyi>
- <https://github.com/teruyi>

**David Vergara**
- <https://github.com/davidvergara>

## Technologies

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
