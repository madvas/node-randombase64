# node-randombase64

## Installation
Since this module uses famous [node-canvas](https://github.com/Automattic/node-canvas) module, you will need to
install Cairo on your machine, so please follow install instructions at [node-canvas](https://github.com/Automattic/node-canvas)

## Usage
### randombase64.generate(options, callback)
#### options
- **width** width of generated image, default: 300
- **height** height of generated image, default: 300
- **minWidth** generates random width between minWidth and maxWidth
- **minHeight** generates random width between minHeight and maxHeight
- **maxWidth**
- **maxHeight**
- **opacity** opacity of a image (between 0-1), default: 1
- **unitSize** pixel size of one noise rectangle. Increase this number to reduce image size. default: 3
- **blackAndWhite** use only black and white colors, default : false
- **type** Type of generated image, default : 'image/png'
- **withPrefix** whether to include image type prefix into generated string e.g. 'data:image/png;base64,', default: false

#### callback (optional)
Note: When callback is passed function generates base64 string asynchronously, when callback is not passed
function return string synchronously.

## Examples
```
var base64str1 = randombase64.generate({
    withPrefix : true,
    unitSize   : 1
  });

  var base64str2 = randombase64.generate({
    height     : 700,
    width      : 850,
    unitSize   : 10,
    withPrefix : true
  });

  var base64str3 = randombase64.generate({
    minHeight     : 100,
    minWidth      : 50,
    maxHeight     : 800,
    maxWidth      : 800,
    blackAndWhite : true,
    unitSize      : 4,
    withPrefix    : true
  });

  randombase64.generate({
    opacity : 0.5
  }, function(err, str) {
        var base64str4 = str;
  });
```

