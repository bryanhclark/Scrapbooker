import io from 'socket.io-client'
import {socketStoreUpdate} from '../client/store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')

})

function uploadImageSocket(image) {
  console.log("in socket")
  socket.emit("image_upload", image)
}

socket.on("update_store", imageObj => {
  console.log("back from server", imageObj)
  return socketStoreUpdate(imageObj)
})

export {socket, uploadImageSocket}
