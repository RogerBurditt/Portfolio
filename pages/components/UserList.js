import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Badge from '@material-ui/core/Badge';

// Stateless component
class UserList extends Component{
  constructor(props){
    super(props);
    this.props = props;
  }

  render(){
    return (
      <div>
        <Badge badgeContent={this.props.badgeContent} color="primary"></Badge>
        {this.props.listContent}
      </div>
    )
  }
}

export default UserList;
