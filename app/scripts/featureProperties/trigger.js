var db = require('./../../../lib/dbHandler.js');
var SAT = require('sat');

function notify(user) {
    console.log("--> Cuidado " + user + "!!");
}

module.exports.triggerNotifications = function(mapId) {
    var V = SAT.Vector;
    var P = SAT.Polygon;
    var ref = new V(0, 0);

    for (var feat1 in db.getFeatures(mapId)) {
        if (feat1.properties.email) {
            var collision = false;
            var vects1 = [];
            var i = 0;
            for (var pos1 in feat1._latlngs) {
                vects1[i++] = new V(pos1.lat, pos1.long);
            }
            var pol1 = new P(ref, vects1);
            for (var feat2 in db.getFeatures(mapId)) {
                if (feat1.feature.user !== feat2.feature.user && !feat2.properties.email && !collision) {
                    var vects2 = [];
                    i = 0;
                    for (var pos2 in feat2._latlngs) {
                        vects2[i++] = new V(pos2.lat, pos2.long);
                    }
                    var pol2 = new P(ref, vects2);
                    if (SAT.testPolygonPolygon(pol1, pol2)) {
                        collision = true;
                        notify(feat1.feature.user);
                    }
                }
            }
        }
    }
};