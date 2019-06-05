import axios from 'axios'

// import {baseUrl} from '../config/config.default.js'

export default function (url, data = {}, type = 'GET') {

    const BaseURL =  url

    if (type === 'GET') {

        let paramStr = ''
         
        Object.keys(data).forEach(key => {
            paramStr += `${key}=${data[key]}&`
        })

        return axios.get(BaseURL + '?', paramStr)

    } else {
        return axios.post(BaseURL, data)
    }
}
