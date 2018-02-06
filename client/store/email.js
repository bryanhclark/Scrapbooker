import axios from 'axios'


export function broadcastEmail(event) {
  return axios.post('/api/email', event)
    .then(res => console.log("Message sent", res.data))
}
