const io = require('socket.io')(3000, {
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
        stream.broadcast.emit('chat-message', { message: message, name: usuarios[stream.id] })
    })

    stream.on('disconnect', () => {
        stream.broadcast.emit('user-disconnected', usuarios[stream.id])
        delete usuarios[stream.idc]
    })
}) 

/* Ctrl+D para cambiar varios a la vez. RENDER*/