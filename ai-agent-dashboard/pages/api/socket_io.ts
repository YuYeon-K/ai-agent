import { Server } from 'socket.io';
import type { NextApiRequest } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: any) {
  if (res.socket.server.io) {
    console.log('✅ Socket.io already running');
    res.end();
    return;
  }

  console.log('🚀 Initializing socket.io...');
  const io = new Server(res.socket.server, {
    path: '/api/socket_io',
  });

  res.socket.server.io = io;

  io.on('connection', (socket) => {
    console.log('🔌 Client connected');

    socket.on('chat-message', (msg) => {
      socket.broadcast.emit('chat-message', msg);
    });

    socket.on('disconnect', () => {
      console.log('❌ Client disconnected');
    });
  });

  res.end();
}
