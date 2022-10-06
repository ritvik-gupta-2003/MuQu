import React from 'react';
import Youtube from 'react-youtube';
import './App.css';

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-2', accessKeyId: 'AKIAU4GEEV7DHTFK5RDF', secretAccessKey: '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'});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      typed: "",
      username: "",
      links: [],
    }
  }

  async fetchData() {
    const response = await fetch('https://1mvqarvetd.execute-api.us-east-2.amazonaws.com/dev');
    const body = await response.json();
    let array = [];
    for (let i = 0; i < body.length; i++) {
      let data = {link: body[i].link, id: body[i].id};
      array.push(data);
    }
    await array.sort((a,b) => a.id - b.id);
    console.log(array);
    this.setState({links: array});
  }
  putData = async(tableName, link, id) => {
    var params = {
      TableName: tableName,
      Item: {
        'link': link,
        'id': id,
      }
    }
    docClient.put(params, function(err, data) {
      console.log(!err ? "success" : err);
    });
  }
  deleteData = async(tableName, link, id) => {
    var params = {
      TableName: tableName,
      Key: {
        'link': link,
        'id': id
      }
    }
    docClient.delete(params, function(err, data) {
      console.log(!err ? "success" : err);
    })
  }

  signIn() {
    const setUsername = async(e) => {
      e.preventDefault();
      this.setState({username:this.state.typed});
      this.setState({typed:""});
      await this.fetchData();
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
      if (e.target.getPlayerState() === 0) {
        await this.deleteData('songlinks', this.state.links[0].link, this.state.links[0].id);
        await this.fetchData();
        //await this.state.links.shift();
        this.setState({typed:""});
      }
    }
    var url = this.state.links.length!==0 ? (String)(this.state.links[0].link) : "";
    var videoId = url.substring(url.indexOf("=")+1);

    const opts = {
      playerVars: {
        autoplay: 1,
      }
    }
    return (
      <div>
        <p>{url}</p>
        <Youtube videoId={videoId} opts={opts} onStateChange={(e) => checkEnded(e)}/>
      </div>
    )
  }
  printSong(params) {
    if (params.url.link === params.list[0].link) return;
    return (
      <div>
        <p>{params.url.link}</p>
      </div>
    )
  }
  playRoom() {
    const setLink = async(e) => {
      e.preventDefault();
      if ((String)(this.state.typed).indexOf("=") !== -1) {
        const d = new Date();
        await this.putData('songlinks', this.state.typed, d.getTime());
        // let link = this.state.typed;
        // let id = d.getTime();
        // this.state.links.push({link,id});
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
          {this.state.links.map(link => <this.printSong key={link.id} list={this.state.links} url={link}/>)}
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