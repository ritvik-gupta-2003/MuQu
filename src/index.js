import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// import * as AWS from 'aws-sdk';

// AWS.config.update({
//   region: "us-east-2",
//   accessKeyId: 'AKIAY5LDIFZX6JKWLB5H',
//   secretAccessKey: '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'
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);