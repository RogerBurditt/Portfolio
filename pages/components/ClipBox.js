import React, { Component } from 'react';

class ClipBox extends Component{
  constructor(props){
    super(props);
    this.props = props;
  }

  render(){
    return (
      <div id="clip-container">
        <iframe
          id="clip-box"
          title="clip-box"
          src={"https://clips.twitch.tv/embed?clip="+this.props.clip}
          gesture="media"  allow="encrypted-media" allowFullScreen>
        </iframe>
      </div>
    )
  }
}

export default ClipBox;
