window.onload = () => {
  let socket = io("http://localhost:3001");
  // console.log("connected socket from client");
  const canvas = document.getElementById("canvas");
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  const ctx = canvas.getContext("2d");
  let prevX = null;
  let prevY = null;
  ctx.lineWidth = 5;

  let e = {
    x: 0,
    y: 0,
  };
  socket.on("update", (data) => {
    e.x += data.x * 10;
    e.y += data.y * 10;

    if (prevX == null || prevY == null) {
      prevX = e.x;
      prevY = e.y;
      return;
    }

    let currentX = e.x;
    let currentY = e.y;

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();

    prevX = currentX;
    prevY = currentY;
  });
};
