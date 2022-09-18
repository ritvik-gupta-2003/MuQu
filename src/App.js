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
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  function SignIn() {
    const setNameName = async(e) => {
      e.preventDefault();
      setUsername(name);
      setName('');
    }
    return (
      <>
        <div>
          <h1>Enter Username</h1>
          <form onSubmit={setNameName}>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <button type="submit">ENTER</button>
          </form>
        </div>
      </>
    )
  }
  return (
    <>
      <div>
        <section>
          {username==="" ? <SignIn /> : <PlayRoom />}
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
      await messagesRef.doc("1").delete();
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
      const id = (messages.length+1)+"";
      await messagesRef.doc(id).set({
        text: link,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
    setLink('');
  }

  const opts = {
    playerVars: {
      autoplay: 1,
      //controls: 0
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

export default App;