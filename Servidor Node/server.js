var express = require("express");
var cors = require("cors");
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({extended: false})
);

var Veiculos = require("./routes/Veiculos");
var Funcionarios = require("./routes/Funcionarios");

app.use("/veiculos", Veiculos);
app.use("/funcionarios", Funcionarios);

app.listen(port, function(){
    console.log("Server is running on port: " + port);
});