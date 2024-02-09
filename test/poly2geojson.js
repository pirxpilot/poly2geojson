const { describe, it } = require('node:test');
const fs = require('fs');
const split = require('split');
const poly2geojson = require('../');

describe('poly2geojson', function () {
  it('should parse poly file with single ring', function (_, done) {
    const ref = require('./fixtures/china.json');

    fs.createReadStream(__dirname + '/fixtures/china.poly')
      .pipe(split())
      .pipe(poly2geojson())
      .on('data', function (geojson) {
        geojson.should.have.property('type', 'Feature');
        geojson.should.have.property('properties', { name: 'china' });
        geojson.should.have.property('geometry');

        const geometry = geojson.geometry;
        geometry.should.have.property('type', 'MultiPolygon');
        geometry.should.have.property('coordinates').with.length(1);

        geojson.should.eql(ref);
        done();
      });
  });

  it('should parse poly file with multiple rings', function (_, done) {
    const ref = require('./fixtures/australia.json');

    fs.createReadStream(__dirname + '/fixtures/australia.poly')
      .pipe(split())
      .pipe(poly2geojson())
      .on('data', function (geojson) {
        geojson.should.have.property('type', 'Feature');
        geojson.should.have.property('properties', { name: 'australia' });
        geojson.should.have.property('geometry');

        const geometry = geojson.geometry;
        geometry.should.have.property('type', 'MultiPolygon');
        geometry.should.have.property('coordinates').with.length(1);

        geojson.should.eql(ref);
        done();
      });
  });

});
