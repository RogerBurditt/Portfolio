import React, { Component } from 'react';
import './css/main.css';
import io from 'socket.io-client';
import timer from '../utilities/ReactTimer.js';
import UserList from './components/UserList';
import ClipBox from './components/ClipBox';
import UserDetails from './components/UserDetails';
import ResponsiveDrawer from './components/ResponsiveDrawer.js';
import DrawerToggleButton from './components/DrawerToggleButton.js';
import Footer from './components/Footer.js';

class TwitchShowcase extends Component{
  constructor(props){
    super(props);

    this.state = {
      drawerOpen: false,
      title: "Showcase",
      ready: false,
      users: [],
      current: -1,
      clip: "SeductiveDreamyZebraTakeNRG",
      cycle: true,
      time: 15,
      view: "clips"
    };

    this.cycleStarted  = false;
    this.cycleInterval = 15;

    this.cycleTimer = new timer(this, (() => this.changeCurrentOnTimer(this)), this.cycleInterval);

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
  }

  changeCurrentOnTimer(context){
    if(context.state.current < context.state.users.length -1){
      context.setState({current: context.state.current+1});
      let randomClip = this.randomIntBetween(0, this.state.users[this.state.current].clips.length);
      this.setState({clip: this.state.users[this.state.current].clips[randomClip],
                     title: "Showcase: " + this.state.users[this.state.current].login});
    }
    else{
      context.setState({current: 0});
      let randomClip = this.randomIntBetween(0, this.state.users[this.state.current].clips.length);
      this.setState({clip: this.state.users[this.state.current].clips[randomClip],
                     title: "Showcase: " + this.state.users[this.state.current].login});
    }
  }

  changeCurrentOnClick(e, user_id){
    let index = this.state.users.map(function(a){return a.login;}).indexOf(e.target.innerHTML);
    if(index > -1){
      this.setState({current:index});

      let randomClip = this.randomIntBetween(0, this.state.users[index].clips.length);
      this.setState({clip: this.state.users[index].clips[randomClip],
                     title: "Showcase: " + this.state.users[index].login});

      this.cycleTimer.start(true);
    }
    else{ console.log('User '+user_id+' not found.'); }
  }

  toggleCycle(checked){
    if(checked){
      this.setState({cycle:true});
      this.cycleTimer.start();
    }
    else{
      this.setState({cycle:false});
      this.cycleTimer.pause();
    }
  }

  randomIntBetween(min, max){
    return Math.floor(Math.random() * (max - min) ) + min;
  }

  componentDidMount(){
    var socket = io();

    socket.on("connected", (data) => {
      socket.emit("CLIENT_REQUEST");
    });

    socket.on("USER_READY", data => {
      // Lazy-loaded
      this.setState({
        users: [...this.state.users, data],
        ready: true,
        current: 0
      });

      let randomClip = this.randomIntBetween(0, this.state.users[this.state.current].clips.length);
      this.setState({clip: this.state.users[this.state.current].clips[randomClip],
                     title: "Showcase: " + this.state.users[this.state.current].login});

      if(!this.cycleStarted){
        this.cycleStarted = true;
        this.cycleTimer.start(this.cycleInterval);
      }
    });

    this.mql = window.matchMedia(`(max-width: 960px)`);
    this.mql.addListener(this.mediaQueryChanged);
    if(this.mql.matches){ this.setState({drawerOpen: false}); }
    else{ this.setState({drawerOpen: true}); }
  }

  // ()=> to maintain context
  toggleDrawer = (e) => {
    this.setState((prevState) => {
      return {drawerOpen: !prevState.drawerOpen};
    });
  };

componentWillUnmount(){
  this.mql.removeListener(this.mediaQueryChanged);
}

mediaQueryChanged(){
  // Automatically sets the drawer open or clased if the window size changes.
  // Prevents the drawer staying closed when resized to desktop.
  if(this.mql.matches){ this.setState({drawerOpen: false}); }
  else{ this.setState({drawerOpen: true}); }
}

  render(){
    // Declare render variables here.
    let userDescription, userDetails;

    if(this.state.ready){
      userDetails = <UserDetails user={this.state.users[this.state.current]}></UserDetails>
    }

    let sidebar =
    <div>
      <h1 id="title">Twitch Showcase</h1>
      <nav id="nav">
        <UserList
          badgeContent={this.state.time}
          onChange={(e, checked) => this.toggleCycle(checked)}
          listContent={this.state.users.map((user) =>
              <p key={user.user_id}>
                <a key={user.user_id} role="button"
                  onClick={(e) => this.changeCurrentOnClick(e)}
                  style={{cursor:"pointer"}}>{user.login}
                </a>
              </p>
            )}>
        </UserList>
      </nav>

      <div className="bottom">
        <a href="/" style={{marginRight: "2em"}}>Hub</a>
        <a href="/showcasetodo" style={{marginLeft: "2em"}}>To Do</a>
      </div>
    </div>


    return (
      <div>
        <DrawerToggleButton click={this.toggleDrawer} />
        <ResponsiveDrawer click={this.toggleDrawer} open={this.state.drawerOpen} content={sidebar} />
        <div id="main">
          <section id="top" className="one dark cover">
            <div className="container">
              <ClipBox className="main" clip={this.state.clip} />
            </div>
          </section>
          <section id="about" className="three">
            <div className="container">{userDetails}</div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}

export default TwitchShowcase;
