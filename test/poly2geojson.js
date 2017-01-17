var fs = require('fs');
var split = require('split');
var poly2geojson = require('../');

describe('poly2geojson', function () {
  it('should parrse poly file', function (done) {
    var ref = require('./fixtures/china.json');

    fs.createReadStream(__dirname + '/fixtures/china.poly')
      .pipe(split())
      .pipe(poly2geojson())
      .on('data', function(geojson) {
        geojson.should.have.property('type', 'Polygon');
        geojson.should.have.property('coordinates').with.length(1);
        geojson.should.eql(ref);
        done();
      });
  });
});
