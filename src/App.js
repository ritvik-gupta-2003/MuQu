import React, {Component} from 'react';
import Youtube from 'react-youtube';
import './App.css';

class App extends Component {
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
    var url = (String)(this.state.links[0]);
    var index = url.indexOf("=");
    url = url.substring(index+1);

    const opts = {
      height:'100',
      width:'100',
      playerVars: {
        autoplay: 1
      }
    }
    console.log(url);
    return (
      <Youtube videoId={url} opts={opts} onReady={this.onReady}/>
    )
  }
  playRoom() {
    const setLink = async(e) => {
      e.preventDefault();
      if ((String)(this.state.typed).indexOf("=") !== -1) {
        this.state.links.push(this.state.typed);
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