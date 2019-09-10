import React, { Component } from 'react';

class UserDetails extends Component{
  constructor(props){
    super(props);
    this.props = props;
  }

  description(){
    if(this.props.user.description.length > 0){
      return (<div>
                <p style={{lineHeight: '1.5em'}}>
                  {this.props.user.description}
                </p>
              </div>);
    }
  }

  render(){
    return (
      <div>
        <p>User: {this.props.user.login}</p>
        <p>Id: {this.props.user.id}</p>
        {this.description()}
      </div>
    )
  }
}

export default UserDetails;
