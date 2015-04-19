/**
 * Created by ismaro3 on 19/04/15.
 */

/*Transforms anomaly JSON data returned from helper server
 to graph JSON required to display a graphic.*/
var anomalyToGraph = function(data){


    var res = data.results;
    var i;
    var _labels = [];
    var _data = [];


    for(i = 0; i <res.length; i++){
        _labels.push(res[i].year);
        _data.push(res[i].anomaly);

    }

    var result = {
        labels: _labels,
        datasets: [
            {
                label: "Anomalies",
                data: _data,
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
            }
        ]
    };

    return result;

}