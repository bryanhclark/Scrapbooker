// Server
module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('image_upload', (imgObj) => {
      console.log("Socket image hit server")
      socket.broadcast.emit('update_img_store', imgObj);
    })

    socket.on('comment_upload', (commentObj) => {
      console.log("Socket comment hit server")
      socket.broadcast.emit('update_comment_store', commentObj);
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
