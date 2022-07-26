const five = require("johnny-five");
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const board = new five.Board();

board.on("ready", function () {
  io.on("connection", (socket) => {
    console.log("Connected Socket");
    const joystick = new five.Joystick({
      pins: ["A0", "A1"],
    });
    joystick.on("change", function () {
      let x = this.x;
      let y = this.y;
      socket.emit("update", { x, y });
    });
  });
});

http.listen(3001, () => {
  console.log(`Listening to port 3000`);
});
