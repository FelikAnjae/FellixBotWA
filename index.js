const Whatsapp = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const Fellix = require('./handler/ClientBuilder.js');
const client = new Fellix();

require('./handler/module.js')(client);
require('./handler/Event.js')(client);

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr,{small: true});
    console.log('QR RECEIVED', qr);
});

client.package = require('./package.json');
client.on('disconnected', () => console.log('Disconnected!'));

process.on("unhandledRejection", (reason, promise) => {

    console.error("Unhandled Rejection at:", reason.stack || reason);
    console.error(reason);

});
  
process.on("uncaughtException", err => {

    console.error(new Date());
    console.error(`Caught exception: ${err}`);
    console.error(err);
    if (err.code == "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
      console.error("true");
    }

});


client.initialize();
