var net = require('net');
let EscPosEncoder = require('esc-pos-encoder');




let encoder = new EscPosEncoder();

// let text = encoder
//     .initialize()
//     .text("hey bo")
//     .encode()

// Check printer status
let checkStatus = encoder.initialize()
.raw([0x10, 0x04, 1]).encode()

// Check printer status
let testPrint = encoder.initialize()
.raw([0x1d, 0x28, 0x41, 0x02, 0x00, 0, 1]).encode()

let text = encoder.initialize()
.line("******************************************************************", 35)
// .line("bogus")
.newline()
.newline()
.newline()
.newline()
.newline()
.newline()
.newline()
.newline()
.cut()
.newline()
.newline()
.newline()
.newline()
.encode()


// Center Justify Text > https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=58
let centerText = encoder.initialize()
.raw([0x1b, 0x61, 0]).line("TEST CENTER", 35)
// .line("bogus")
.newline()
.newline()
.newline()
.newline()
.newline()
.newline()
.newline()
.newline()
.cut()
.newline()
.newline()
.newline()
.newline()
.encode()


// Feed paper n lines  > https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=15
let raw = encoder.initialize().raw([0x1b, 0x4a, 255]).cut().encode()

// Feed paper n lines  > https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=15
let raw2 = encoder.initialize().raw([0x1b, 0x64, 10]).cut().encode()


let newLine = encoder.initialize().newline().encode()

let cut = encoder
    .initialize()
    .cut('partial')
    .encode()

// const openClientConnection = async (port, ip) => {
//     const client = new net.Socket();
//     return new Promise((res, rej) => {
//         client.connect(
//            port, ip,
//             () => res(client)
//         );
//         client.on('error', err => rej(err));
//     });
// }

// const connection = await openClientConnection(9100,'192.168.50.157')
// console.log('connection:', connection)

// // console.log(result);

// // const text = "\x0A"
// // const clearBuffer = "\x1b\x40"

// var binaryString = "\x0A" + "Batman";
// // 
// var buffer = Buffer.from(binaryString)
// // var buffer = Buffer.from(clearBuffer)

var client = new net.Socket();
client.connect(9100, '192.168.50.157', function() {
	console.log('Connected')
    // client.write(buffer)
    // client.write(raw2)
    // client.write(newLine)
    // client.write(centerText)
    const status = client.write(testPrint)
    // client.write(cut);
    client.destroy()
});

// const str = new TextDecoder("utf-8").decode(raw)

// console.log(str)

