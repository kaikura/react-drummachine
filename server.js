const rotaryEncoder = require('./rotatoryE');

const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
// PER POT
//const { Board, Sensor } = require("johnny-five");

const five = require("johnny-five");
const board = new five.Board();

const io = require('socket.io')();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', '/src/index.html'));
});





 var enc_val = '';
  board.on('ready', () => {
    const upButton = new five.Button(13);
    const downButton = new five.Button(12);
    const pressButton = new five.Button(11);
  
    rotaryEncoder({
      upButton,
      downButton,
      pressButton,
      onUp: () => {
        enc_val='up';
        console.log('up');
      },
      onDown: () => {
        enc_val='down';
        console.log('down');
      },
      onPress: () => {
        enc_val='press';
       
        console.log('press');
      },
    });
  });


io.on('connection', (client) => {
  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', enc_val);
    }, interval);
  });
});

app.listen(process.env.PORT || 8080);
io.listen(8000);
console.log('listening on port ' + 8000);
