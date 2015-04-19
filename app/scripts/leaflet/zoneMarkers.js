/**
 * Created by ismaro3 on 15/04/15.
 */



var disasterIcon = L.icon({
    iconUrl: '/images/disaster.png',
    shadowUrl: '',

    iconSize:     [39, 32], // size of the icon
    shadowSize:   [32, 39], // size of the shadow
    iconAnchor:   [20, 16], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


var cropIcon = L.icon({
    iconUrl: '/images/crop.png',
    shadowUrl: '',

    iconSize:     [39, 32], // size of the icon
    shadowSize:   [32, 39], // size of the shadow
    iconAnchor:   [20, 16], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


var subscriptionIcon = L.icon({
    iconUrl: '/images/subscription.png',
    shadowUrl: '',

    iconSize:     [39, 32], // size of the icon
    shadowSize:   [32, 39], // size of the shadow
    iconAnchor:   [20, 16], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var diseaseIcon = L.icon({
    iconUrl: '/images/disease.png',
    shadowUrl: '',

    iconSize:     [39, 32], // size of the icon
    shadowSize:   [32, 39], // size of the shadow
    iconAnchor:   [20, 16], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var weatherIcon = L.icon({
    iconUrl: '/images/weather.png',
    shadowUrl: '',

    iconSize:     [39, 32], // size of the icon
    shadowSize:   [32, 39], // size of the shadow
    iconAnchor:   [20, 16], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});



var markerContainer = {};

//Adds the zone marker for the passed zone.
//If a marker for that zone already exists,
//removes it and creates a new one
//feature is a "feature" object
//Stores in markerContainer the added marker
var addZoneMarker= function(id,feature, map){

    console.log(feature);
    console.log("Adding marker for id " +id);
    var pastMarker = markerContainer[id];
    if(pastMarker!=undefined){
        //If it exists, we remove it
        removeZoneMarker(id,feature,map);
    }

    var centroid =  getCentroid(feature.geometry.coordinates[0]);

    if(centroid != undefined) {

        var icon = undefined;
        switch (feature.properties.category) {
            case "category-catastrophe":
                icon = disasterIcon;
                break;
            case "category-crop":
                icon = cropIcon;
                break;
            case "category-disease":
                icon = diseaseIcon;
                break;
            case "category-weather":
                icon = weatherIcon;
                break;
            case "category-sub":
                icon = subscriptionIcon;
                break;
        }
       var marker =  L.marker(centroid,{icon: icon});
        marker.addTo(map);
        markerContainer[id] =marker;
    }

}

//Removes a zone marker
var removeZoneMarker = function(id,feature,map){

    var marker = markerContainer[id];
    map.removeLayer(marker);
    delete markerContainer[id];
}

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
