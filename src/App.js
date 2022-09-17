import React from 'react';
import Youtube from 'react-youtube';
import './App.css';

import {putData} from './AwsFunctions.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      typed: "",
      username: "",
      links: []
    }
  }
  signIn() {
    const setUsername = async(e) => {
      e.preventDefault();
      this.setState({username:this.state.typed});
      this.setState({typed:""});
    }
    return (
      <>
        <div>
          <h1>Enter Username</h1>
          <form onSubmit={setUsername}>
            <input value={this.state.typed} onChange={(e) => this.setState({typed:e.target.value})} />
            <button type="submit">ENTER</button>
          </form>
        </div>
      </>
    )
  }

  playLink() {
    const checkEnded = (e) => {
      const duration = e.target.getDuration();
      const current = e.target.getCurrentTime();
      if (current / duration === 1) {
        this.state.links.shift();
        this.setState({typed:""});
      }
    }
    var url = (String)(this.state.links[0]);
    url = url.substring(url.indexOf("=")+1);

    const opts = {
      playerVars: {
        autoplay: 1
      }
    }
    return (
      <Youtube videoId={url} opts={opts} onStateChange={(e) => checkEnded(e)}/>
    )
  }
  printSong(url) {
    return (
      <div>
        <p>{url.url}</p>
      </div>
    )
  }
  playRoom() {
    const setLink = async(e) => {
      e.preventDefault();
      if ((String)(this.state.typed).indexOf("=") !== -1) {
        this.state.links.push(this.state.typed);
        await putData('songlinks', this.state.typed);
      }
      this.setState({typed:""});
    }
    return (
      <>
        <div>
          <h1>Enter Youtube Link</h1>
        </div>
        <div>
          <form onSubmit={setLink}>
            <input value={this.state.typed} onChange={(e) => this.setState({typed:e.target.value})} />
            <button type="submit">Play</button>
          </form>
        </div>
        <div>
          {this.playLink()}
          {this.state.links.map(link => <this.printSong url={link}/>)}
        </div>
      </>
    )
  }
  
  render() {
    return (
      <section>
        {this.state.username==="" ? this.signIn() : this.playRoom()}
      </section>
    );
  }
}

export default App;