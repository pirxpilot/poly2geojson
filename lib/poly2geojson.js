const { Transform } = require('node:stream');

module.exports = poly2geojson;

function poly2geojson() {
  let feature;
  let poly;
  let ring;

  function onCoordinates(line) {
    const c = line.trim().split(/\s+/).map(parseFloat);
    if (!ring) {
      onRingStart(line);
    }
    ring.push(c);
  }

  function onRingStart(line) {
    if (line[0] !== '!') {
      // start new poly
      if (poly) {
        onPolyEnd();
      }
      onPolyStart();
    }

    ring = [];
  }

  function onRingEnd() {
    poly.push(ring);
    ring = undefined;
  }

  function onPolyStart() {
    poly = [];
  }

  function onPolyEnd() {
    feature.geometry.coordinates.push(poly);
    poly = undefined;
  }

  function onFeatureStart(line) {
    feature = {
      type: 'Feature',
      properties: {
        name: line.trim()
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: []
      }
    };
  }

  function transform(line, encoding, next) {
    if (line === 'END') {
      if (ring) {
        onRingEnd(line);
      } else if (poly) {
        onPolyEnd(line);
        this.push(feature);
      } else {
        return next('unexpected END');
      }
      return next();
    }

    if (!feature) {
      onFeatureStart(line);
    } else if (!ring) {
      onRingStart(line);
    } else {
      onCoordinates(line);
    }
    next();
  }

  return new Transform({
    objectMode: true,
    transform
  });
}
