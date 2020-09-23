
class node {
  constructor(id, temperature, humidity) {
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    this.id = id;
    this.temperature = temperature;
    this.humidity = humidity;
    this.date_time =
      year +
      "-" +
      month +
      "-" +
      date +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;
  }
}

var http = require("http");
// var node_infos = [new node(1, 0, 0), new node(2, 0, 0)];
var node_infos = [];
var text = "";

function show_nodes(node) {
  text =
    text +
    "<tr ><td > " +
    node.id +
    "   </td><td> " +
    node.temperature +
    "C </td><td> " +
    node.humidity +
    "   </td><td> " +
    node.date_time +
    "</td></tr>";
}

var server = http.createServer(function(req, res) {
  if (req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    //node_infos.sort(compare);
    text =
      '<!DOCTYPE html><html><head><style>#customers {font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;border-collapse: collapse;width: 100%;}#customers td, #customers th {border: 1px solid #ddd;padding: 8px;}#customers tr:nth-child(even){background-color: #f2f2f2;}#customers tr:hover {background-color: #ddd;}#customers th {padding-top: 12px;  padding-bottom: 12px;  text-align: left;  background-color: #4CAF50;  color: white;}</style></head><body><h1>Nodes data</h1><table id="customers">  <tr>    <th>Module_id</th>    <th>Temperature</th>    <th>Humidity</th> <th>Date and time</th>  </tr>';
    // '<div>Nodes data</div><div style="margin: auto; text-align: center; width: 50%; border: 3px solid black; padding: 10px;"> <table style="border: 1px solid black;" ><tbody><tr><th style="border: 1px solid black;">Module_id</th><th style="border: 1px solid black;">Temperature</th><th style="border: 1px solid black;">Humidity</th></tr>';
    node_infos.forEach(show_nodes);
    res.end(text + "</table></body></html>");
  }
  if (req.method === "POST") {
    var body = "";
    req.on("data", function(chunk) {
      body += chunk;
    });

    req.on("end", function() {
      var id = parseInt(body.split(":")[0], 10);
      var node_temperature = parseFloat(body.split(":")[1].split("-")[0]);
      var node_humidity = parseFloat(body.split(":")[1].split("-")[1]);
      //var i = 0;
      node_infos.push(new node(id, node_temperature, node_humidity));
      // for (; i < node_infos.length; i++) {
      //   if (node_infos[i].id === id) {
      //     node_infos[i].temperature = node_temperature;
      //     node_infos[i].humidity = node_humidity;
      //   }
      // }
      console.log(body);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(body);
    });
  }
});
server.listen(3000);
