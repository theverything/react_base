var express = require('express');
var router = express.Router();

// simple logger for this router's requests
// all requests to this router will first hit this middleware
router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

router.get('/', function(req, res, next) {
  res.json({ api: "1.0" });
});

router.get('/people/:count', function(req, res, next) {
  if (req.params.count === "1") {
    res.json([
      {name: "Jeff", eyes: "hazel"}
      ]);
  } else if (req.params.count === "2") {
    res.json([
      {name: "Jeff", eyes: "hazel"},
      {name: "Kat", eyes: "brown"}
      ]);
  } else if (req.params.count === "3") {
    res.json([
      {name: "Jeff", eyes: "hazel"},
      {name: "Kat", eyes: "brown"},
      {name: "Caity", eyes: "blue"}
      ]);
  } else {
    res.json([{}]);
  }
  res.json([
    {name: "Jeff", eyes: "hazel"},
    {name: "Kat", eyes: "brown"},
    {name: "Caity", eyes: "blue"}
    ]);
});

module.exports = router;
