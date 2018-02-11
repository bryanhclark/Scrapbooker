import io from 'socket.io-client'
import { socketStoreImageUpdate, socketStoreCommentUpdate} from '../client/store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')

})

function uploadImageSocket(image) {
  socket.emit('image_upload', image)
}

function uploadCommentSocket(comment) {
  console.log("Sending comment in socket to server", comment)
  socket.emit('comment_upload', comment)
}

socket.on('update_img_store', imageObj => {
  return socketStoreImageUpdate(imageObj)
})

socket.on('update_comment_store', commentObj => {
  console.log('got comment from server socket')
  return socketStoreCommentUpdate(commentObj)
})

export { socket, uploadImageSocket, uploadCommentSocket }
