import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Canvas from './components/Canvas'

interface IRoutesProps {}

class Routes extends Component<IRoutesProps> {
  render(){
    return(
      <Router>
        <Route exact path='/' component={Canvas} />
      </Router>
    )
  }
}

export default Routes
