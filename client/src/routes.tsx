import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Canvas  from './components/Canvas'
import PublishedImages from './components/PublishedImages'

interface IRoutesProps {}

class Routes extends Component<IRoutesProps> {
  render(){
    return(
      <Router>
        <Route exact path='/' component={Canvas} />
        <Route  path='/images' component={PublishedImages} />
      </Router>
    )
  }
}

export default Routes
