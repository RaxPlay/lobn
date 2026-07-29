import { createServer } from 'node:http';
import next from 'next';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    socket.on("join-room", ({board_id, userName}) => {
      socket.join(board_id); 
      socket.to(board_id).emit(`user '${userName} joined board'`);
    });

    socket.on("add-task", ({ taskContent, taskCreator, boardId }) => {
      socket.to(boardId).emit("add-task", `${taskCreator}, added new task: ${taskContent}`);
    })
  });

  httpServer
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});