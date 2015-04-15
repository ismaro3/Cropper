'use strict';

/**
 * @memberof CollaborativeMap
 * @fileOverview Leaflet map directive.
 * Initializes the map.
 * Loads already existing features from the Database.
 * Initializes the map Synchronization and the MapHandler
 * @exports CollaborativeMap.MapDirective

 * 
 * @requires  ApiService
 * @requires MapHandler
 * @requires SynchronizeMap
 * 
 * @author Dennis Wilhelm
 */
angular.module('CollaborativeMap')
  .directive('map', ['MapHandler', 'SynchronizeMap', 'ApiService',
    function(MapHandler, SynchronizeMap, ApiService) {
      var mapLoadingDiv;

        var disasterIcon = L.icon({
            iconUrl: '/images/disaster.png',
            shadowUrl: '',

            iconSize:     [39, 32], // size of the icon
            shadowSize:   [32, 39], // size of the shadow
            iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });


        var cropIcon = L.icon({
            iconUrl: '/images/crop.png',
            shadowUrl: '',

            iconSize:     [39, 32], // size of the icon
            shadowSize:   [32, 39], // size of the shadow
            iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });

        var diseaseIcon = L.icon({
            iconUrl: '/images/disease.png',
            shadowUrl: '',

            iconSize:     [39, 32], // size of the icon
            shadowSize:   [32, 39], // size of the shadow
            iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });

        var weatherIcon = L.icon({
            iconUrl: '/images/weather.png',
            shadowUrl: '',

            iconSize:     [39, 32], // size of the icon
            shadowSize:   [32, 39], // size of the shadow
            iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });



        //Input: Array of arrays of coordinates: [[X1,Y1],[XN,YN]]
        //Output: Centroid, with X and Y switched

        var getCentroid = function (arr) {
            var i = 0;
            var minX = undefined;
            var maxX = undefined;
            var minY = undefined;
            var maxY = undefined;
            //For each point of the figure
            for(i = 0;  i < arr.length; i++){
                //If the point is defined
                if(arr[i] != undefined){
                    var _X = arr[i][0];
                    var _Y = arr[i][1];

                    if(_X != undefined && _Y != undefined){


                        if (_X > maxX || maxX == undefined){
                            maxX = _X;
                        }
                        if(_X < minX || minX == undefined){
                            minX = _X;
                        }
                        if (_Y > maxY || maxY == undefined){
                            maxY = _Y;
                        }
                        if(_Y < minY || minY == undefined){
                            minY = _Y;
                        }

                    }

                }


            }

            //Calculate centroid
            if(maxX != undefined && maxY !=undefined){
                var centerX = minX + ((maxX - minX) /2);
                var centerY = minY + ((maxY - minY) /2);
                //Invert coordinates in order to work
                return [centerY,centerX];
            }
            else{
                return undefined;
            }


        }
      /**
       * Load the features for the current map from the database
       * @param  {String} mapId      the map id
       * @param  {Object} map        the map
       * @param  {Object} drawnItems layer group for the drawn items
       */

      function loadFeatures(mapId, map, drawnItems) {
        showLoading();
        ApiService.getFeaturesOboe(mapId)
          .node('rows.*', function(row) {
                 var  currentTime = new Date().getTime().toString().substr(0,12);

                //Buscamos la propiedad
                var expirationTime = row.doc.properties.expiration;
                var creationTime = row.doc._id.toString().substr(0,12);

                //La resta es milisegundos
                var dif = parseInt(currentTime) - parseInt(creationTime);

                if(expirationTime!=undefined){
                    expirationTime = expirationTime.substring(0, expirationTime.length - 1);

                    expirationTime = expirationTime*60*60*1000;
                    //Tenemos el expirationTime en milisegundos
                    if  (dif > expirationTime){
                        //Borramos
                        //remove the layer from the map
                        $scope.selectedFeature = row.doc;
                        deleteFeature();
                    }
                    else{
                        // This callback will be called everytime a new object is
                        // found in the foods array.
                        MapHandler.addGeoJSONFeature(map, {
                            'feature': row.doc,
                            'fid': row.doc._id
                        }, drawnItems);
                    }
                }
                else{
                    // This callback will be called everytime a new object is
                    // found in the foods array.
                    MapHandler.addGeoJSONFeature(map, {
                        'feature': row.doc,
                        'fid': row.doc._id
                    }, drawnItems);
                }


                //Draw the icon for each category
           var centroid =  getCentroid(row.doc.geometry.coordinates[0]);
                if(centroid != undefined){

                    //Icon
                switch(row.doc.properties.category){
                    case "category-catastrophe":
                        L.marker(centroid,{icon: disasterIcon}).addTo(map);
                        break;
                    case "category-crop":
                        L.marker(centroid,{icon: cropIcon}).addTo(map);
                        break;
                    case "category-disease":
                        L.marker(centroid,{icon: diseaseIcon}).addTo(map);
                        break;
                    case "category-weather":
                        L.marker(centroid,{icon: weatherIcon}).addTo(map);
                        break;
                }
                    console.log(row.doc);



                }

          })
          .done(function() {
            removeLoading();
          });


      }

      /**
       * Creates a loading div
       */
      function showLoading() {
        mapLoadingDiv = document.createElement('div');
        mapLoadingDiv.className = 'mapLoading';
        var loading = document.createElement('div');
        loading.className = 'loading';
        mapLoadingDiv.appendChild(loading);
        document.body.appendChild(mapLoadingDiv);
      }

      /**
       * Removes the loading div from the page
       */

      function removeLoading() {
        document.body.removeChild(mapLoadingDiv);
      }


      return {
        restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
        template: '<div id="map"></div>',
        replace: true,
        scope: {
          mapId: '=mapid'
        },
        // transclude: true,
        link: function postLink($scope) {

          //expose map for debugging purposes
          //var map = window._map = L.mapbox.map('map', 'dnns.h8dkb1bh')
          if (navigator.geolocation) {
              var pos = navigator.geolocation.getCurrentPosition(function(position) {
                  var latitude = position.coords.latitude;
                  var longitude = position.coords.longitude;
                  map.panTo([latitude, longitude]);

              });
          }
          var map = window._map = L.mapbox.map('map').setView([51.95577098349905, 7.635455131530762], 14);

          var mapLink = '<a href="http://www.esri.com/">Esri</a>';
          var wholink = 'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';


            /*####DEFINITION OF BASE MAPS#####*/

            //Aerial view
            var aerial = L.tileLayer(
            'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
              maxZoom: 18,
              attribution: '&copy; ' + mapLink + ', ' + wholink
            });

            //OpenStreetMap
            var osm = L.tileLayer('http://{s}.tiles.mapbox.com/v4/cropper.lnepd0j8/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY3JvcHBlciIsImEiOiJ5T2lwVjE0In0.kMLCv_sm4-KJDFIWWQl3QQ').addTo(map);


            var baseMaps = {
              "OpenStreetMaps" : osm,
                "Aerial":aerial
            };

            /*####DEFINITION OF OVERLAY MAPS#####*/

            //Temperature overlay
            var tempMap = L.OWM.temperature();
            tempMap.setOpacity(0.3);

            //Precipitation overlay
            var precipitationMap = L.OWM.precipitation();
            precipitationMap.setOpacity(0.5);

            //Cloud overlay
            var cloudMap =L.OWM.clouds();
            cloudMap.setOpacity(0.5);


            //Weather overlay
            var city = L.OWM.current({intervall: 15, lang: 'en'});

            //Rain overlay
            //var rainMap =L.OWM.rain();
            //rainMap.setOpacity(0.3);

            /*var nexrad = L.tileLayer.wms("http://sedac.ciesin.columbia.edu/geoserver/wms", {
                layers: 'aglands:aglands-croplands-2000',
                format: 'image/png',
                transparent:true,
                attribution: "Weather data © 2012 IEM Nexrad"
            });


            var airquality = L.tileLayer.wms("http://sedac.ciesin.columbia.edu/geoserver/wms", {
                layers: 'epi:epi-environmental-performance-index-2014_eh-air-quality',
                format: 'image/png',
                transparent:true,
                attribution: "Weather data © 2012 IEM Nexrad"
            });

            airquality.setOpacity(0.5);

//drought
            var drought = L.OWM.cloudsClassic();
            drought.setOpacity(0.7);*/



            //NDVI MAP
            //We calculate the number of map we have to retrievve
            //Number of map are 1,9,17... (1 + 8n, where n >=0)
            var now = new Date();
            var start = new Date(now.getFullYear(), 0, 0);
            var diff = now - start;
            var oneDay = 1000 * 60 * 60 * 24;
            var day = Math.floor(diff / oneDay);
            //Current day
            Math.floor((day-15)/8)*8 +1

           //We calculate the number of map, supossing there is a 15-day delay on the upload of the new map
            var getTime = Math.floor((day-15)/8)*8 + 1;
            var dayString = getTime+"";
            while (dayString.length <3) dayString= "0" + dayString;

            var NDVI = L.tileLayer('http://glam1n1.gsfc.nasa.gov/wmt/MODIS/std/GMYD09Q1/NDVI/2015/' + dayString +'/{z}/{x}/{y}.png', {
                attribution: 'Global Agricultural Monitor © Modis - Nasa',
                maxZoom: 9
            });
            NDVI.setOpacity(0.7);



            //Overlapping maps
            var overlayMaps = {
              "Temperature":  tempMap,
                "Clouds": cloudMap,
                "Precipitations":precipitationMap,
                "Cities Weather" : city,
                "NDVI (Weekly)": NDVI

            };



            L.control.layers(baseMaps, overlayMaps, {
            position: 'topleft'
          }).addTo(map);


            //NDVI Legend
            var ndviLegend = L.control({position: 'bottomleft'});
            ndviLegend.onAdd = function (map) {
                var div = L.DomUtil.create('div', 'info legend');

                div.innerHTML +=
                    '<img src="/images/ndvi_legend.png" alt="legend">';

                return div;
            };

            //Cropland2000 legend
            var crop2000Legend = L.control({position: 'bottomleft'});
            crop2000Legend.onAdd = function (map) {
                var div = L.DomUtil.create('div', 'info legend');

                div.innerHTML +=
                    '<img src="/images/cropland_legend.png" alt="legend">';

                return div;
            };


            map.on('overlayadd', function (eventLayer) {
                // Switch to the Population legend...
                if (eventLayer.name == 'NDVI (Weekly)') {
                    //this.removeControl(populationChangeLegend);
                    ndviLegend.addTo(this);
                }
            });
            map.on('overlayremove', function (eventLayer) {
                // Switch to the Population legend...
                if (eventLayer.name == 'NDVI (Weekly)') {
                    //this.removeControl(populationChangeLegend);
                    this.removeControl(ndviLegend);
                }
            });

          map.infoControl.setPosition('bottomleft');
          // Initialise the FeatureGroup to store editable layers
          var drawnItems = window.drawnItems = new L.FeatureGroup();
          map.addLayer(drawnItems);

          // Initialise the draw control and pass it the FeatureGroup of editable layers
          var drawControl = window._drawControl = new L.Control.Draw({
            edit: false,
            draw: {
              circle: false,
              rectangle: false,
              marker: {
                icon: L.mapbox.marker.icon({})
              },
              polyline: {
                shapeOptions: {
                  color: '#555555',
                  fillOpacity: 0.5,
                  weight: 2,
                  opacity: 1
                }
              },
              polygon: {
                shapeOptions: {
                  color: '#555555',
                  fillOpacity: 0.5,
                  weight: 2,
                  opacity: 1
                }
              }
            }
          });
          map.addControl(drawControl);

          var drawNotificationControl = window._drawControl = new L.Control.Draw({
              edit: false,
              draw: {
                  circle: false,
                  rectangle: {
                      shapeOptions: {
                          color: '#FE2E2E',
                          fillOpacity: 0.5,
                          weight: 2,
                          opacity: 1
                      }
                  },
                  marker: false,
                  polyline: false,
                  polygon: false
              }
          });
          map.addControl(drawNotificationControl);
          L.drawLocal.draw.toolbar.buttons.rectangle = 'Add a notification area';

          L.drawLocal.edit.handlers.edit.tooltip.subtext = 'Click "Stop Editing" to stop the edit mode';

          //Drawn features have to be added to the layer group
          map.on('draw:created', function(e) {
            drawnItems.addLayer(e.layer);
            MapHandler.editFeature(e.layer);
          });

          //Out of some unknown reasons the leaflet.draw tooltips where deactivated
          map.options.drawControlTooltips = true;

          //Load already existing features from the db
          loadFeatures($scope.mapId, map, drawnItems);

          //Initialize the MapHandler (wrapper for all map based actions)
          MapHandler.initMapHandler(map, drawnItems, $scope.$parent, drawControl);

          //Initialize the map synchronization (handles all Websocket related sync stuff)
          SynchronizeMap.init(map, $scope.$parent, drawnItems);

        }
      };
    }
  ]);
