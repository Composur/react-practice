import React ,{Component} from 'react'

export default class LikeButton extends Component{
    render(){
        return(
            <button id='likeButton'>
                <span className='likeText'>赞</span>
                <span>👍</span>
            </button>
        )
    }
}