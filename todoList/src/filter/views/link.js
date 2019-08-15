import React, { Component } from 'react';
import {setFilter} from '../actions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';

class Link extends Component{
  static propTypes={
    children:PropTypes.string
  }
  constructor(){
    super()
    this.filter=this.filter.bind(this)
  }
  filter(){
    this.props.setFilter(this.props.FilterTypes)
  }
  render(){
    return(
      <button className='' onClick={this.filter}>{this.props.children}</button>
    )
  }
}

const mapStateToProps=(state,ownProps)=>({
  active:state.filter===ownProps.FilterTypes
})

const mapDispathToProps={
  setFilter
}

export default connect(mapStateToProps,mapDispathToProps)(Link)