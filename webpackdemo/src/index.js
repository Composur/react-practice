import _ from 'lodash';
import Print from './print'
function component() {
    var element = document.createElement('div');
    const btn=document.createElement('button')
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');    
    btn.innerHTML='Click'
    btn.onclick=Print
    element.appendChild(btn)
    return element;
  }

  document.body.appendChild(component());

  if(module.hot){
    module.hot.accept('./print.js',function(){
      console.log('printme')
      PrintMe()
    })
  }