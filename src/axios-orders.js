import axios from 'axios'


const ordersInstance = axios.create({
    baseURL: "https://burgerbuilder-5446b.firebaseio.com/"
})

export default ordersInstance