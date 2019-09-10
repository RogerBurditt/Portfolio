import React, { Component } from 'react';
import '../css/drawer.css'

class Footer extends Component{
  constructor(props){
    super(props);
    this.props = props;

    this.state = {

    }
  }

  componentDidMount(){

  }

  render(){
    return (
      <div id="footer">
        <ul className="copyright">
          <li><a href="/">Roger Burditt Jr.</a></li><br/><br/>
          <li>Built on: Node | Next.js | Express | React</li>
        </ul>
      </div>
    )
  }
}

export default Footer;
