import React, { Component } from 'react';
import './css/main.css';
import ResponsiveDrawer from './components/ResponsiveDrawer.js';
import DrawerToggleButton from './components/DrawerToggleButton.js';

class ShowcaseTodo extends Component{
  constructor(props){
    super(props);

    this.state = {
      drawerOpen: true,
      todoList: [
        "Toggle automatic cycling.",
        "Change to interactive clip-box.",
        "Clean up text styling (pointed out in user testing).",
        "Highlight active user in UserList.",
        "Implement ordering buttons (Shuffle, Alphabetize, etc).",
        "Enable SSR Material-UI components.",
        "Add more images and color.",
        "Make the timer's function more intuitive (place next to name in UserList?)",
        "Login -> Connect to twitch account and pull users from 'Following' and/or 'Subscriptions'.",
        "Remove all hard-coding.",
        "Do something cool with channel icons."
      ]
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
  }

  componentDidMount(){
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
    let sidebar =
    <div>
      <div className="top">
        <div id="logo">
          <h1 id="title">Showcase To-Do</h1>
        </div>
        <nav id="nav">

        </nav>
      </div>

      <div className="bottom">
        <a href="/" style={{float:"left", marginLeft:"2em"}}>Hub</a>
        <a href="/twitchshowcase" style={{float:"right", marginRight:"2em"}}>Showcase</a>
      </div>
    </div>

    return (
        <div>
        <DrawerToggleButton click={this.toggleDrawer} />
        <ResponsiveDrawer click={this.toggleDrawer} open={this.state.drawerOpen} content={sidebar} />

  <div id="main">
    <section id="top" className="two cover">
      <div className="container">
      {this.state.todoList.map((item) =>
          <p key={item}>
            <li
              style={{color:"black"}}>{item}
            </li>
          </p>
        )}
      </div>
    </section>
  </div>
  <div id="footer">
    <ul className="copyright">
      <li><a href="/">Roger Burditt Jr.</a></li><br/><br/>
        <li>Built on: Node | Next.js | Express | Webpack | React</li>
    </ul>
  </div>
</div>
    );
  }
}

export default ShowcaseTodo;
