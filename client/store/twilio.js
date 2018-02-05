import axios from 'axios'


export function broadcastTextMessage(event) {
  return axios.post('/api/twilio', event)
    .then(res => console.log("Message sent", res.data))
}
