import Cookies from 'js-cookie'

export const redirectTo=function(type,header){
    let path='/'

    if(!header){
        if(type==='admin'){
            path='/bossInfo'
        }else{
            path='/personInfo'
        }
    }else{
        if(type==='admin'){
            path='/boss'
        }else{
            path='/personal'
        } 
    }
    return path
}

export const getCookie=function(cookieName='user_id'){
    return Cookies.get(cookieName)
}
export const clearCookie=function(cookieName='user_id'){
     Cookies.remove(cookieName)
     return
}