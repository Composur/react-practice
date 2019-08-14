import React, { Component } from 'react';
import {setFilter} from '../actions'
import {connect} from 'react-redux'
class Filter extends Component {
  state = {  }
  render() {
    return (
      <div>
        <button>全部</button>
        <button>未完成</button>
        <button>已完成</button>
      </div>
    );
  }
}

const mapSateToProps=(state)=>({
  
})

const mapDispatchToProps={
  setFilter
}

export default connect(null,mapDispatchToProps)(Filter)
