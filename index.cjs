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

    stream.on('wpp-session-on', phoneNumber => {
        io.emit('wpp-contact-on', phoneNumber)
    })

    stream.on('send-wpp-message', (message, receptorPhoneNumber) => {
        io.emit('wpp-message', { message: message, receptorPhoneNumber: receptorPhoneNumber })
    })
    
    stream.on('new-user', usuario => {
        usuarios[stream.id] = usuario;
        io.emit('user-connect', usuario)
    })

    stream.on('send-chat-message', message => {
        io.emit('chat-message', { message: message, name: usuarios[stream.id] })
    })

    stream.on('disconnect', () => {
        io.emit('user-disconnected', usuarios[stream.id])
        delete usuarios[stream.id]
    })
}) 

/* Ctrl+D para cambiar varios a la vez. RENDER*/
