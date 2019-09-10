import React, { Component } from 'react';

class UserDetails extends Component{
  constructor(props){
    super(props);
    this.props = props;

    this.ready = false;
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

  componentDidMount(){
    this.ready = true;
  }

  render(){
    let details;

    if(this.ready){
      details =
      <div>
        <p>User: {this.props.user.login}</p>
        <p>Id: {this.props.user.user_id}</p>
        <p>Type: {this.props.user.broadcaster_type}</p>
        {this.description()}
      </div>
    }

    return (
      <div>
        {details}
      </div>
    )
  }
}

export default UserDetails;
