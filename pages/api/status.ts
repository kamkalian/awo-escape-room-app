import { SerialPort } from 'serialport'
import { ReadlineParser } from 'serialport'
import { accessSync, constants } from 'node:fs';


var data: String;
var fs = require('fs'); 


export default function handler(req: any, res: any){
    console.log("################## api status call")

    function sendData(code: any, data: { [key: string]: string }) {
        console.log("sendData")
        console.log(data);
        res.status(code).json({data: data});
        res.end();
    }

    var port = new SerialPort({
        path: '/dev/ttyUSB0',
        baudRate: 9600}, 
        function (err) {
            if (err) {
                sendData(200, {"msg": "Cannot open device"})
                return console.log('Error: ', err.message)
              
            }
        }
    )

    var buffer: any = '';
    port.on('data', function(chunk: string) {
        buffer += chunk;
        var answers = buffer.split(/\r?\n/);
        buffer = answers.pop();

        console.log(buffer)
        if (answers.length > 0) {
            sendData(200, {"countdown": answers[0]})
            port.close();
        }
    })
       
    port.on('error', function(err) {
        sendData(500, err.message);
    });
}