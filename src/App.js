import React from 'react';
import Youtube from 'react-youtube';
import './App.css';

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-2', accessKeyId: 'AKIAY5LDIFZX6JKWLB5H', secretAccessKey: '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'});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      typed: "",
      username: "",
      links: [],
    }
    this.dbData = {};
  }
  fetchData = async(tableName) => {
    var params = {
      TableName: tableName
    }
    docClient.scan(params, function(err, data) {
    })
  }
  putData = async(tableName, data) => {
    var params = {
        TableName: tableName,
        Item: {
            'songlinks_part': 'song',
            'songlinks_sort': data,
        }
    }
    docClient.put(params, function(err, data) {
        if (err) {
            console.log("Error",err)
        }
        else {
            console.log("Success",data)
        }
    })
  }

  signIn() {
    const setUsername = async(e) => {
      e.preventDefault();
      this.setState({username:this.state.typed});
      this.setState({typed:""});
      console.log(this.fetchData('testdb'));
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
    const checkEnded = async(e) => {
      const duration = e.target.getDuration();
      const current = e.target.getCurrentTime();
      if (current / duration === 1) {
        await this.state.links.shift();
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
        await this.putData('testdb', this.state.typed);
        this.setState({typed:""});
      }
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