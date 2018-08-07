import  React ,{Component} from 'react'

export default class log extends Component{
    log() {
        return console.log.bind(console)
    }
}