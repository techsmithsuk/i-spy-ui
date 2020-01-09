import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';

test('renders navbar', () => {
  const Navbar = document.createElement('Navbar');
  ReactDOM.render(<App />, Navbar);
});

test('renders suspect', () => {
  const Suspect = document.createElement('Suspect');
  ReactDOM.render(<App />, Suspect);
});