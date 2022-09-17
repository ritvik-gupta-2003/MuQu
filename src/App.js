import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      typed: "",
      username: ""
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
  
  render() {
    return (
      <section>
        {this.signIn()}
      </section>
    );
  }
}

export default App;
