[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][gemnasium-image]][gemnasium-url]

# poly2geojson

Convert [Osmosis polygon filter][poly-file] file to [GeoJSON polygon].

## Install

```sh
$ npm install --save poly2geojson
```

## Usage

```js
var split = require('split'); // or any other line splitting stream
var poly2geojson = require('poly2geojson');

fs.createReadStream('area.poly')
  .pipe(split())
  .pipe(poly2geojson())
  .on('data', function(geojson) {
    console.log(geojson); // GeoJSON polygon
  });

```

## License

MIT © [Damian Krzeminski](https://code42day.com)

[poly-file]: http://wiki.openstreetmap.org/wiki/Osmosis/Polygon_Filter_File_Format
[GeoJSON polygon]: http://geojson.org/geojson-spec.html#polygon

[npm-image]: https://img.shields.io/npm/v/poly2geojson.svg
[npm-url]: https://npmjs.org/package/poly2geojson

[travis-url]: https://travis-ci.org/code42day/poly2geojson
[travis-image]: https://img.shields.io/travis/code42day/poly2geojson.svg

[gemnasium-image]: https://img.shields.io/gemnasium/code42day/poly2geojson.svg
[gemnasium-url]: https://gemnasium.com/code42day/poly2geojson
