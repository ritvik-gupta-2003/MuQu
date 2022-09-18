import React, {useState} from 'react';
import Youtube from 'react-youtube';
import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {useCollectionData} from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyDS_D4s0AMfA4JzAaWVTN9EvFDwDUNw3Oc",
  authDomain: "muqu-2e634.firebaseapp.com",
  projectId: "muqu-2e634",
  storageBucket: "muqu-2e634.appspot.com",
  messagingSenderId: "47150978499",
  appId: "1:47150978499:web:5ce8af764c2404066e1976",
  measurementId: "G-B75Q9HED44"
})
const firestore = firebase.firestore();

function App() {
  return (
    <>
      <div>
        <section>
          <PlayRoom />
        </section>
      </div>
    </>
  );
}

function PlayRoom() {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy("createdAt", "asc");
  const [messages] = useCollectionData(query, {idField: 'id'});
  const [link, setLink] = useState('');

  const checkEnded = async(e) => {
    if (e.target.getPlayerState() === 0) {
      // await query.limit(1).get().delete().then(querySnapshot => {
      //   if (!querySnapshot.empty()) {
      //     querySnapshot.docs[0].ref.delete();
      //   }
      // })
    }
  }
  const onPlayerReady = async(e) => {
    await e.target.playVideo();
  }
  var url = (messages !== null && messages !== undefined) ? (String)(messages[0]?.text) : "";
  url = url.substring(url.indexOf("=")+1);

  const sendMessage = async(e) => {
    e.preventDefault();
    if (url !== -1) {
      await messagesRef.add({
        text: link,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
    setLink('');
  }

  const opts = {
    playerVars: {
      autoplay: 1,
      controls: 0
    }
  }

  return (
    <>
      <div>
        <h1>Enter Youtube Link</h1>
      </div>
      <div>
        <form onSubmit={sendMessage}>
          <input value={link} onChange={(e) => setLink(e.target.value)} />
          <button type="submit">Play</button>
        </form>
      </div>
      <div>
      {url !== "" ? <Youtube videoId={url} opts={opts} onReady={(e) => onPlayerReady(e)} onStateChange={(e) => checkEnded(e)}/> : <p></p>}
        {messages?.map(msg => <PrintSong key={msg.id} message={msg}/>)}
      </div>
    </>
  )
}
function PrintSong(props) {
  return (
    <div>
      <p>{props.message.text}</p>
    </div>
  )
}



















// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       typed: "",
//       username: "",
//       links: [],
//     }
//   }

//   fetchMessages = async() => {
//     query.onSnapshot((snapshot) => {
//       snapshot.docChanges().forEach((changes) => {
//         this.setState({links:changes.doc.data()});
//         console.log("GOT MESSAGE");
//       })
//     })
//   }

  // signIn() {
  //   const setUsername = async(e) => {
  //     e.preventDefault();
  //     this.setState({username:this.state.typed});
  //     this.setState({typed:""});
  //   }
  //   return (
  //     <>
  //       <div>
  //         <h1>Enter Username</h1>
  //         <form onSubmit={setUsername}>
  //           <input value={this.state.typed} onChange={(e) => this.setState({typed:e.target.value})} />
  //           <button type="submit">ENTER</button>
  //         </form>
  //       </div>
  //     </>
  //   )
  // }

  // playLink() {
  //   const checkEnded = async(e) => {
  //     const duration = e.target.getDuration();
  //     const current = e.target.getCurrentTime();
  //     if (current / duration === 1) {
  //       await this.state.links.shift();
  //       this.setState({typed:""});
  //     }
  //   }
  //   var url = (String)(this.state.links[0]);
  //   url = url.substring(url.indexOf("=")+1);

  //   const opts = {
  //     playerVars: {
  //       autoplay: 1
  //     }
  //   }
  //   return (
  //     <Youtube videoId={url} opts={opts} onStateChange={(e) => checkEnded(e)}/>
  //   )
  // }
  // printSong(url) {
  //   return (
  //     <div>
  //       <p>{url.url}</p>
  //     </div>
  //   )
  // }
  // playRoom() {
  //   const setLink = async(e) => {
  //     e.preventDefault();
  //     if ((String)(this.state.typed).indexOf("=") !== -1) {
  //       this.state.links.push(this.state.typed);
  //       this.setState({typed:""});
  //     }
  //   }
  //   return (
  //     <>
  //       <div>
  //         <h1>Enter Youtube Link</h1>
  //       </div>
  //       <div>
  //         <form onSubmit={setLink}>
  //           <input value={this.state.typed} onChange={(e) => this.setState({typed:e.target.value})} />
  //           <button type="submit">Play</button>
  //         </form>
  //       </div>
  //       <div>
  //         {this.playLink()}
  //         {this.state.links.map(link => <this.printSong url={link}/>)}
  //       </div>
  //     </>
  //   )
  // }
  
//   render() {
//     return (
//       <section>
//         {this.state.username==="" ? this.signIn() : this.playRoom()}
//       </section>
//     );
//   }
// }

export default App;