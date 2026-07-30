import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    socket.on("join-room", ({ boardId, userName }) => {
      socket.join(boardId);
      console.log(`${userName} joined ${boardId}`);
    });

    socket.on("add-task", ({ taskContent, taskCreator, boardId }) => {
      socket.to(boardId).emit("add-task", { taskContent, taskCreator, boardId });
      console.log(
        `${taskCreator} added new task: ${taskContent} to board: ${boardId}`,
      );
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
