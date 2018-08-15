import axios from 'axios'
axios.defaults.baseURL='/api'
/**
 * 增加拦截器（Interceptors）函数
 * 1.这里只是响应拦截,还可以有request拦截
 */ 
axios.interceptors.response.use(res=>{
    return res.data
},err=>{
    // 响应错误后处理
    return Promise.reject(err.response.data)
})
