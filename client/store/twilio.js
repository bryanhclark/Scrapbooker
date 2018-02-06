import axios from 'axios'


export function broadcastTextMessage(messageObj) {
  return axios.post('/api/twilio', messageObj)
    .then(res => console.log("Message sent", res.data))
}
