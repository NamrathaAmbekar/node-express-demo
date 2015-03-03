var express = require('express');
var router = express.Router();
var restify = require('restify');
var _ = require('underscore');

var client = restify.createJsonClient({
    url :'http://api.geonames.org',
    version: '~1.0'
});


/* GET users listing. */
router.get('/', function(req, res, next) {
    var countrycode = (req.query.countrycode)?req.query.countrycode:'MX';
    client.get('/citiesJSON?north=42.1&south=-9.9&east=-22.4&west=55.2&lang=de&username=demo', function (err, request, response, obj) {
        console.log('Server returned: %j', obj);
       var newobj= _.findWhere(obj.geonames, {countrycode: countrycode});
        console.log('Data beloging to %s: %j',countrycode, newobj);
        res.send(newobj);
    });
});

router.get('/countrycodes', function(req, res, next) {
    client.get('/citiesJSON?north=42.1&south=-9.9&east=-22.4&west=55.2&lang=de&username=demo', function (err, request, response, obj) {
        console.log('Server returned: %j', obj);
        var newobj=_.pluck(obj.geonames, 'countrycode')
        console.log('List of country codes', newobj);
        res.render('cities',{data:newobj});
    });
});

module.exports = router;
