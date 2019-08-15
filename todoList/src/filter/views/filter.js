import React, { Component } from 'react';
import Link from "./link";
import { FilterTypes } from '../../constants';

export default class Filter extends Component {
  state = {  }
  render() {
    return (
      <div>
       <Link FilterTypes={FilterTypes.ALL}>{FilterTypes.ALL}</Link>
       <Link FilterTypes={FilterTypes.COMPLETED}>{FilterTypes.COMPLETED}</Link>
       <Link FilterTypes={FilterTypes.UNCOMPLETED}>{FilterTypes.UNCOMPLETED}</Link>
      </div>
    );
  }
}


