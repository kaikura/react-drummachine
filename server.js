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


val=0;
/*
board.on("ready", () => {
  //const potentiometer = new Sensor("A0");

  //potentiometer.on("change", () => {
    
    const {value} = potentiometer;
    console.log("Sensor: ");
    console.log("  value  : ", value);
    val = value;

    //console.log("  raw    : ", raw);
    console.log("-----------------");
      const upButton = new five.Button(13);
  const downButton = new five.Button(12);
  const pressButton = new five.Button(11);

  rotaryEncoder({
    upButton,
    downButton,
    pressButton,
    onUp: () => {
      console.log('up');
    },
    onDown: () => {
      console.log('down');
    },
    onPress: () => {
      console.log('press');
    },
  });
    
  });
  */
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