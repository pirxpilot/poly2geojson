[![NPM version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Dependency Status][deps-image]][deps-url]

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

MIT © [Damian Krzeminski](https://pirxpilot.me)

[poly-file]: http://wiki.openstreetmap.org/wiki/Osmosis/Polygon_Filter_File_Format
[GeoJSON polygon]: http://geojson.org/geojson-spec.html#polygon

[npm-image]: https://img.shields.io/npm/v/poly2geojson
[npm-url]: https://npmjs.org/package/poly2geojson

[build-url]: https://github.com/pirxpilot/poly2geojson/actions/workflows/check.yaml
[build-image]: https://img.shields.io/github/actions/workflow/status/pirxpilot/poly2geojson/check.yaml?branch=main

[deps-image]: https://img.shields.io/librariesio/release/npm/poly2geojson
[deps-url]: https://libraries.io/npm/poly2geojson
