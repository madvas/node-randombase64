var should = require('should')
  , randombase64 = require('../lib/randombase64')
  , validator = require('validator');

describe('generate', function() {
  it('generates random image with default parameters and returns base64 representation', function(done) {
    validator.isBase64(randombase64.generate()).should.be.true;
    done();
  });

  it('is able to generate image with size between mix and max', function(done) {
    var img = randombase64.generate({
      minWidth  : 300,
      maxWidth  : 500,
      minHeight : 400,
      maxHeight : 600
    });
    validator.isBase64(img).should.be.true;
    done();
  });

  it('generates smaller image, when used greater unitSize parameter', function(done) {
    var img1 = randombase64.generate({
      unitSize : 1,
      width    : 500,
      height   : 500
    });

    var img2 = randombase64.generate({
      unitSize : 5,
      width    : 500,
      height   : 500
    });

    validator.isBase64(img1).should.be.true;
    validator.isBase64(img2).should.be.true;
    img1.length.should.be.greaterThan(img2.length);
    done();
  });

  it('generates smaller image size when blackAndWhite option is used', function(done) {
    var img1 = randombase64.generate();
    var img2 = randombase64.generate({
      blackAndWhite : true
    });

    validator.isBase64(img1).should.be.true;
    validator.isBase64(img2).should.be.true;
    img1.length.should.be.greaterThan(img2.length);
    done();
  });

  it('returns base64 even with image type prefix', function(done) {
    var type = 'image/png';
    randombase64.generate({
      type       : type,
      withPrefix : true
    }).indexOf('data:' + type + ';base64,').should.not.eql(-1);
    done();
  });

  it('returns base64 string asynchronously', function(done) {
    randombase64.generate({}, function(err, str) {
      should.not.exist(err);
      str.length.should.be.above(0);
      validator.isBase64(str).should.be.true;
      done();
    });
  });
});