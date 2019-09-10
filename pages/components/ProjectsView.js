import React, { Component } from 'react';

class ProjectsView extends Component{
  constructor(props){
    super(props);
    this.props = props;
  }

  render(){
    return (
      <div>
        <div className="card" id="projectgallery">
          <p>Twitch Showcase</p>
          <img src="/static/TSThumb.png"/>
          <a target="_blank" href="/twitchshowcase" style={{float:"left"}}>Live</a>
          <a target="_blank" href="https://github.com/RogerBurditt/Portfolio" style={{float:"right"}}>Code</a><br/>
        </div>
      </div>
    )
  }
}

export default ProjectsView;
