const { io } = require('socket.io-client');

// Connect to the WebSocket server
const socket = io('http://localhost:3010');

// User joins a room
socket.emit('joinRoom', { userId: 'user1', agentId: 'agent1' });

// Listen for room join confirmation
socket.on('joinedRoom', (message) => {
  console.log('Room Joined:', message);

  // User sends a message
  socket.emit('sendMessage', {
    senderId: 'user1',
    senderRole: 'user',
    receiverId: 'agent1',
    message: 'Hello, I need help with my account ela.',
  });
});

// Listen for received messages
socket.on('receiveMessage', (message) => {
  console.log('New Message Received:', message);

  // Simulate agent sending a response
  if (message.senderRole === 'user') {
    socket.emit('sendMessage', {
      senderId: 'agent1',
      senderRole: 'agent',
      receiverId: 'user1',
      message: 'Hello! How can I assist you today?',
    });
  }
});
