import React,{ Component, Fragment } from 'react'
import Header from './header'
import Footer from './footer'
interface ILayoutProps {}
interface ILayoutState {}

class Layout extends Component<ILayoutProps, ILayoutState> {
  render() {
    return(
      <Fragment>
        <Header />
        {this.props.children}
        <Footer />
      </Fragment>
    )
  }
}

export default Layout