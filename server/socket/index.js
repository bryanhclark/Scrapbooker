// Server
module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('image_upload', (imgObj) => {
      console.log("HERE => ", imgObj[src])
      socket.broadcast.emit('got_it', {obj: "it's"});
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
