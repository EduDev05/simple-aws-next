import React from 'react';
// import './App.css';
import {Chatbot} from './components/Chatbot';
// import './styles/index.css';
import './styles/estilosg.css';


function App() {

  
  // window.addEventListener('message', (event) => {
  //   // Reject all messages except ones from https://parent.example.com
  //   if (event.origin !== 'https://pruebachat--tecmonterreymxqa.myvtex.com/') return;
  
  //   // Do a DOM manipulation on https://video.example.com.
  
  //   // Send a success message to https://parent.example.com
  //   event.source.postMessage('succeeded', event.origin);
  // });
  const visible = window.toolbar.visible;
  console.log("window.toolbar.visible", visible);
  //  document.domain="pruebachat--tecmonterreymxqa.myvtex.com";
  console.log("domino", document.domain);
  // let url=window.location.href;
  // console.log("URL",url);
  let agent = navigator.userAgent;
  console.log("navigator.userAgent",agent);
  return (
    <div >
      <Chatbot/>
    </div>
  );
}

export default App;
