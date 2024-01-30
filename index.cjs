const io = require('socket.io')(80, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      allowedHeaders: ['Access-Control-Allow-Origin', 'Content-Type'], 
      credentials: true
    }
})

const usuarios = {};

/* Evento io = socket. Headers. Iterar. SEO*/

io.on('connection', stream => {
    stream.on('new-user', usuario => {
        usuarios[stream.id] = usuario;
        stream.broadcast.emit('user-connect', usuario)
    })

    stream.on('send-chat-message', message => {
        stream.broadcast.emit('chat-message', { message: message, name: users[stream.id] })
    })

    stream.on('disconnect', () => {
        stream.broadcast.emit('user-disconnected', users[stream.id])
        delete users[stream.idc]
    })
}) 

/* Ctrl+D para cambiar varios a la vez. RENDER*/