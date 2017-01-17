var Transform = require('stream').Transform;

module.exports = poly2geojson;

function poly2geojson() {

  var poly = {
    type: 'Polygon',
    coordinates: []
  };
  var ring;
  var file;


  function onCoordinates(line) {
    var c = line.trim().split(/\s+/).map(parseFloat);
    ring.push(c);
  }

  function onRingStart() {
    ring = [];
  }

  function onRingEnd() {
    poly.coordinates.push(ring);
    ring = undefined;
  }

  function onPolyStart() {
    poly = {
     type: 'Polygon',
      coordinates: []
    };
  }

  function onPolyEnd() {
    poly = undefined;
  }

  function transform(line, encoding, next) {
    if (!file) {
      file = line;
      return next();
    }
    if (line === 'END') {
      if (ring) {
        onRingEnd(line);
      } else if (poly) {
        this.push(poly);
        onPolyEnd(line);
      } else {
        return next('unexpected END');
      }
    }
    else if (!poly) {
      onPolyStart(line);
    } else if (!ring) {
      onRingStart(line);
    } else {
      onCoordinates(line);
    }
    next();
  }

  return new Transform({
    objectMode: true,
    transform: transform
  });

}
