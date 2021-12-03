const SerialPort = require('serialport');
// const serialPort = new SerialPort('/dev/ttyUSB0');
const serialPort = new SerialPort('/dev/serial0');

const Readline = require('@serialport/parser-readline')
const parser = serialPort.pipe(new Readline({ delimiter: '\r\n' }));

class Queue {
    constructor() {
      this.queue = [];
    }
  
    enqueue(element) {
      this.queue.push(element);
      return this.queue;
    }
  
    dequeue() {
      return this.queue.shift();
    }
  
    peek() {
      return this.queue[0];
    }
  
    size() {
      return this.queue.length;
    }
  
    isEmpty() {
      return this.queue.length === 0;
    }
  
    print() {
      return this.queue;
    }
  }


const cola = new Queue();

function enviarSMS(mensaje,numero){
    serialPort.on('open', () => {
      setTimeout(function(){
          serialPort.write('AT+CMGF=1\r');
          setTimeout(function(){
              serialPort.write('AT+CMGS=\"+591'+numero+'\"\r');
              setTimeout(function(){
                  serialPort.write(mensaje+'\r');
                  setTimeout(function(){
                      serialPort.write('\x1A');
                  }, 100);
              }, 100);
          }, 50);
      }, 50);
  	});

	let estado = 0;
	parser.on('data', function(data){
		let Mydata = data.toString();
		console.log(Mydata);
		cola.enqueue(Mydata);
		console.log("===============");
		if(Mydata == 'OK'){
			estado++;
			if(estado == 2){
			  console.log(cola);
        // parser.close(function (err) {
        //   console.log('port closed', err);
        // });
				return true;
			}
		}
	});

  parser.on('error', function (err) {
    console.log('Error: ', err.message);
  });
	
}

module.exports.enviarSMS = enviarSMS;