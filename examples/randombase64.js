var randombase64 = require('../lib/randombase64'),
  http = require('http');

http.createServer(function(req, res) {
  var img1 = randombase64.generate({
    withPrefix : true,
    unitSize   : 1
  });

  var img2 = randombase64.generate({
    height     : 700,
    width      : 850,
    unitSize   : 10,
    withPrefix : true
  });

  var img3 = randombase64.generate({
    minHeight     : 100,
    minWidth      : 50,
    maxHeight     : 800,
    maxWidth      : 800,
    blackAndWhite : true,
    unitSize      : 4,
    withPrefix    : true
  });


  res.writeHead(200, {'Content-Type' : 'text/html'});
  res.end(''
      + '<meta http-equiv="refresh" content="1;" />'
      + '<p>Lenght: ' + img1.length + '</p>'
      + '<img src="' + img1 + '" />'
      + '<p>Lenght: ' + img2.length + '</p>'
      + '<img src="' + img2 + '" />'
      + '<p>Lenght: ' + img3.length + '</p>'
      + '<img src="' + img3 + '" />'
  );

}).listen(3000);
console.log('Server started on port 3000');