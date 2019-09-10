import React, { Component } from 'react';
import '../css/drawer.css'

class DrawerToggleButton extends Component{
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
      <button className="toggle-button" onClick={this.props.click}>
        <div className="togle-button__line" />
        <div className="togle-button__line" />
        <div className="togle-button__line" />
      </button>
    )
  }
}

export default DrawerToggleButton;
