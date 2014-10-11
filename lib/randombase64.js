var Canvas = require('canvas');

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

exports.generate = function(options, callback) {
  var canvas = new Canvas()
    , ctx = canvas.getContext('2d')
    , x, y
    , unitSize
    , opacity
    , width, height
    , getRgb;

  options = options || {};
  unitSize = options.unitSize || 3;
  opacity = options.opacity || 1;
  options.type = options.type || 'image/png';

  if (options.width) {
    width = options.width;
  } else if (options.minWidth && options.maxWidth) {
    width = getRandomArbitrary(options.minWidth, options.maxWidth);
  } else {
    width = 300;
  }

  if (options.height) {
    height = options.height;
  } else if (options.minHeight && options.maxHeight) {
    height = getRandomArbitrary(options.minHeight, options.maxHeight);
  } else {
    height = 300;
  }

  if (options.blackAndWhite) {
    getRgb = function() {
      var color = Math.round(Math.random()) * 255;
      return [color, color, color]
    }
  } else {
    getRgb = function() {
      return [getRandomArbitrary(0, 255), getRandomArbitrary(0, 255), getRandomArbitrary(0, 255)]
    }
  }

  canvas.width = width;
  canvas.height = height;

  for (x = 0; x < width; x += unitSize) {
    for (y = 0; y < height; y += unitSize) {
      var rgb = getRgb();
      ctx.fillStyle = "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + opacity + ")";
      ctx.fillRect(x, y, unitSize, unitSize);
    }
  }

  if (!options.withPrefix) {
    var prefix = 'data:' + options.type + ';base64,';
    if (callback) {
      var callbackWrap = function(err, str) {
        callback(err, str.replace(prefix, ''));
      };
      return canvas.toDataURL(options.type, callbackWrap);
    }
    return canvas.toDataURL(options.type).replace(prefix, '');
  }
  return canvas.toDataURL(options.type, callback);
};