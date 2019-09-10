import React, { Component } from 'react';
import './css/main.css';
import ProjectsView from './components/ProjectsView.js';
import ResumeView from './components/ResumeView.js';
import ResponsiveDrawer from './components/ResponsiveDrawer.js';
import DrawerToggleButton from './components/DrawerToggleButton.js';
import Footer from './components/Footer.js';

class Index extends Component{
  constructor(props){
    super(props);

    this.defaultView =
    <ProjectsView/>

    this.state = {
      drawerOpen: false,
      view: this.defaultView,
      title: "Hub: Projects"
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
  }

  changeView(e){
    let newView = <div></div>
    let newTitle = "Hub";

    if(e.target.id === "Default"){
      newView = this.defaultView;
      newTitle = "Hub: Default";
    }
    else if(e.target.id === "Projects"){
      newView =
      <ProjectsView />
      newTitle = "Hub: Projects";
    }
    else if(e.target.id === "Resume"){
      newView = <ResumeView />
      newTitle = "Hub: Resume";
    }

    this.setState({view:newView, title:newTitle});

    if(this.mql.matches){ this.setState({drawerOpen: false}); }
    else{ this.setState({drawerOpen: true}); }
  }

  // ()=> to maintain context
  toggleDrawer = (e) => {
    this.setState((prevState) => {
      return {drawerOpen: !prevState.drawerOpen};
    });
  };

componentDidMount(){
  this.mql = window.matchMedia(`(max-width: 960px)`);
  this.mql.addListener(this.mediaQueryChanged);

  if(this.mql.matches){ this.setState({drawerOpen: false}); }
  else{ this.setState({drawerOpen: true}); }
}

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
          <div key="top" className="top">
            <div id="logo">
              <h1 id="title">Roger Burditt Jr.</h1>
            </div>

            <nav id="nav">
              <a id="Projects" role="button" onClick={ (e) => this.changeView(e) } style={{cursor:"pointer"}}>
                Projects
              </a><br/><br/>
              <a id="Resume" role="button" onClick={ (e) => this.changeView(e) } style={{cursor:"pointer"}}>
                Resume
              </a>
            </nav>
          </div>
      ;

    return (
      <div>
        <DrawerToggleButton click={this.toggleDrawer} />
        <ResponsiveDrawer click={this.toggleDrawer} open={this.state.drawerOpen} content={sidebar} />
        <div id="main">
          <section id="top" className="two cover">
            <div className="container">
              {this.state.view}
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Index;
