const cors = require('cors');
const express = require('express');
const app = express();

const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
       ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}

const port = process.env.PORT || 8080;

app.use(forceSSL());
app.use(cors());
app.use(express.static(__dirname + '/dist/frontend'));

app.options('*', cors())
app.listen(port);

console.log("Listening on *:" + port);
