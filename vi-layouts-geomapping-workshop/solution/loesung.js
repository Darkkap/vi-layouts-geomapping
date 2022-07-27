var w = 600;
var h = 600;

//************** */
var projection = d3.geoMercator()
    .center([11.5, 52.35])
    .scale(2000)
    .translate([w / 2, h / 2]);

var path = d3.geoPath()
    .projection(projection);

//Color scale
//************** */
var color = d3.scaleLinear()
    .range(["#2980B9", "#85C1E9"]);

var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);


//************** */
d3.csv("bl_daten.csv").then(function (data) {
    color.domain([
        d3.min(data, function (d) { return d.Ranking; }),
        d3.max(data, function (d) { return d.Ranking; })
    ]);

    //Load GeoJSON
    //************** */
    d3.json("bundesland.json").then(function (json) {
        for (var i = 0; i < data.length; i++) {
            //Staatenname aus csv
            var dataState = data[i].Bundesland;
            //Wert aus csv in float umwandeln
            var dataValue = parseFloat(data[i].Ranking);
            //für jedes Objekt in json
            for (var j = 0; j < json.features.length; j++) {
                //Staatennamen aus geojson
                var jsonState = json.features[j].properties.NAME_1;
                //wenn Staat aus json in csv vorhanden
                if (dataState == jsonState) {
                    //Wert aus csv in json unter properties kopieren
                    json.features[j].properties.Ranking = dataValue;
                    break;
                }
            }
        }
        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", function (d) {
                //Get data value
                return color(d.properties.Ranking);
            });
        //**************** */
        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return projection([d.lon, d.lat])[0];
            })
            .attr("cy", function (d) {
                return projection([d.lon, d.lat])[1];
            })
            .attr("r", function(d) {
                return Math.sqrt(parseInt(d.Einwohner) * 0.000005);
                })
            .style("fill", "yellow")
            .style("stroke", "gray")
            .style("stroke-width", 0.25)
            .style("opacity", 0.75)
    });
});