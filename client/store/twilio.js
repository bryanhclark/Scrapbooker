import axios from 'axios'


export function broadcastTextMessage (eventId) {
  console.log('in broadvast twilio', eventId)
 return axios.post('/api/twilio/', eventId)
    .then(res => console.log("Message sent", res.data))
}
