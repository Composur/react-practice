import React, { Component } from 'react';
import {setFilter} from '../actions'
import {connect} from 'react-redux'


class Link extends Component{
  constructor(){
    super()
    this.filter=this.filter.bind(this)
  }
  filter(){
    debugger
    this.props.setFilter(this.props.FilterTypes)
  }
  render(){
    console.log(this.props)
    return(
      <a href='javascript:void(0)' onClick={this.filter}>{this.props.children}</a>
    )
  }
}

const mapStateToProps=(state,ownProps)=>(console.log(state,ownProps),{
  active:state.filter===ownProps.FilterTypes
})

const mapDispathToProps={
  setFilter
}

export default connect(mapStateToProps,mapDispathToProps)(Link)