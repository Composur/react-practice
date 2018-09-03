import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ProTypes from 'prop-types'
import Header from './Header'
import Content from './Content'
import PropTypes from 'prop-types'
function createStore(reducer) {
  let state = null;
  const listener = []
  const subscribe = (listene) => listener.push(listene)
  const getState = () => state
  const dispatch = (action) => {
    state = reducer(state, action)
    listener.forEach((listener) => listener())
  }
  dispatch({}) //首次初始化state
  return {getState, dispatch, subscribe}

}

// 构建一个store

const themeReducer = (state, action) => {
  if (!state) return  {
    themeColor : 'red'
  }
  switch (action.type) {
    case 'CHANGE_COLOR':
      return {
        ...state,
        themeColor: action.themeColor
      }
    default:
      return state;
  }
}

const store = createStore(themeReducer)
class App extends Component {

  static childContextTypes = {
    store: PropTypes.object   
  }

  getChildContext () {
    return { store }
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <Content/>
      </div>
    );
  }
}

export default App;
