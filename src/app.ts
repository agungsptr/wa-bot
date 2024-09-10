import { Client, LocalAuth } from "whatsapp-web.js";
import * as qrcode from "qrcode-terminal";

function main() {
  // Create a new client instance
  const client = new Client({
    puppeteer: {
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    },
    authStrategy: new LocalAuth({
      dataPath: `${__dirname}/../session`,
    }),
  });

  // When the client is ready, run this code (only once)
  client.once("ready", () => {
    console.log("Client is ready!");
  });

  // When the client received QR-Code
  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });

  client.on("message_create", (message) => {
    console.log(message.body);
    if (message.body.toLowerCase() === "ping") {
      client.sendMessage(message.from, "pong");
    }
  });

  // Start your client
  client.initialize();
}

main();
