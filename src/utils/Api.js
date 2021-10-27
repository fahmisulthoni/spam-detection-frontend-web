import axios from 'axios'

export default axios.create({
    baseURL: "https://twispadbackend.herokuapp.com/",
    //baseURL: "http://127.0.0.1:5000/",
    responseType: "json"
  })

// export const detect = newTweet => {
//     return base
//     .post('/detect', {
//         tweet: newTweet.tweet,
//         url: newTweet.url,
//         result: newTweet.result
//     })
//     .then(res => {
//         console.log("Registered")
//     })
//     .catch(err => {
//         console.log(err)
//     })
// }

