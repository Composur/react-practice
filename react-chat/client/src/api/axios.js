import axios from 'axios'

// import {baseUrl} from '../config/config.default.js'

export default function (url, data = {}, type = 'GET') {

    const BaseURL =  url

    if (type === 'GET') {

        let paramStr = ''
        Object.keys(data).forEach(key => {
            paramStr += `${key}=${data[key]}&`
        })

        if(paramStr) {
            paramStr = paramStr.substring(0, paramStr.length-1)
          }
        return axios.get(BaseURL + '?', paramStr)

    } else {
        return axios.post(BaseURL, data)
    }
}
