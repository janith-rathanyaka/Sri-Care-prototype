const { io } = require('socket.io-client');

// Connect to the WebSocket server as the agent
const agentSocket = io('http://localhost:3010');

// Agent joins the room with the user
agentSocket.emit('joinRoom', { userId: 'user1', agentId: 'agent1' });

// Listen for room join confirmation
agentSocket.on('joinedRoom', (message) => {
  console.log('[Agent] Room Joined:', message);
});

// Listen for messages from the user
agentSocket.on('receiveMessage', (message) => {
  console.log('[Agent] New Message Received:', message);

  // Simulate agent's reply to the user
  if (message.senderRole === 'user') {
    agentSocket.emit('sendMessage', {
      senderId: 'agent1',
      senderRole: 'agent',
      receiverId: 'user1',
      message: 'Thank you for reaching out. How can I assist you with your order?',
    });
  }
});
