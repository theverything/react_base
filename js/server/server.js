var express = require('express');
var app = express();
var api_router = require('./api_router');

app.enable('trust proxy');

app.use("/api", api_router);
app.use("/", express.static('./public'));

app.listen(8181);
