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
            path='/person'
        } 
    }
    return path
}