import axios from 'axios'


export function broadcastTextMessage (textObj) {
 return axios.post('/api/twilio', textObj)
    .then(res => console.log(res.data))
}
