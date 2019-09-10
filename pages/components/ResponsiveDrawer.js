import React, { Component } from 'react';
import '../css/drawer.css';
import DrawerToggleButton from './DrawerToggleButton.js';

class ResponsiveDrawer extends Component{
  constructor(props){
    super(props);
    this.props = props;
  }

  componentDidMount(){

  }

  render(){
    let classes;
    if(this.props.open){ classes = "toolbar open"; }
    else{ classes = "toolbar"; }

    return (
      <div className={classes}>
        <DrawerToggleButton
        click={this.props.click} />
        {this.props.content}
      </div>
    )
  }
}

export default ResponsiveDrawer;
