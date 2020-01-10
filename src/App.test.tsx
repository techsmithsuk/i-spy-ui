import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';

test('renders App', () => {
  const app = document.createElement('App');
  ReactDOM.render(<App />, app);
});

