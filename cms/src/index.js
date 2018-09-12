import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,IndexRoute,Redirect,IndexLink} from 'react-router';
import {Link,BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


import myTable from './components/table';
ReactDOM.render((
   <BrowserRouter>
    <Router>
          <Route path="/" component={App}>
              {/* <IndexRoute path="myCard" component={myCard} /> */}
              <Route path="myTable" component={myTable} />
              {/* <Route path="myForm" component={myForm} />
              <Route path="myChart" component={myChart} />
              <Route path="myCalendar" component={myCalendar} />
              <Route path="myAnimate" component={myAnimate} />
              <Route path="myCard" component={myCard} /> */}
          </Route>
      </Router>
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
