var w = 600;
var h = 600;

var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

//Projektion für Deutschland
var projection = d3.geoMercator()
    .center([11.5, 52.35])
    .scale(2000)
    .translate([w / 2, h / 2]);

//Path Generator
var path = d3.geoPath()
    .projection(projection);

//TODO: Erstelle die Farbskala

//TODO: Lade hier die CSV

//Lade GeoJSON:
//Der Aufruf von d3.json muss sich in dem von d3.csv befinden
d3.json("bundesland.json").then(json => {
    //TODO: Merge die GeoJSON mit der CSV          
    svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        //TODO: Fülle die Shapes nach den Rankingwerten
        .attr("stroke", "grey")
        .attr("fill", "white");
});

//TODO: Erstelle hier die Kreise
//svg.selectAll("circle") ...