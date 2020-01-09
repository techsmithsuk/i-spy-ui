import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';

test('renders navbar', () => {
  const Navbar = document.createElement('Navbar');
  ReactDOM.render(<App />, Navbar);
});

test('renders person card', () => {
  const Person = document.createElement('Person');
  ReactDOM.render(<App />, Person);
});