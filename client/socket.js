import io from 'socket.io-client'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')

})

function uploadImageSocket(image) {
  console.log("in socket")
  socket.emit("image_upload", image)
}

socket.on("got_it", obj => {console.log(obj)})
export {socket, uploadImageSocket}
